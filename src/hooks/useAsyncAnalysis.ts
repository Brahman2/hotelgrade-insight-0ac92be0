/**
 * useAsyncAnalysis.ts
 * More reliable alternative using job polling instead of streaming
 * Use this if streaming SSE continues to have issues
 */

import { useState, useCallback, useRef } from 'react';

interface AnalysisResult {
  overallScore: number;
  categories: Record<string, any>;
  _meta?: any;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-production-13e22.up.railway.app';

export function useAsyncAnalysis() {
  const [status, setStatus] = useState<'idle' | 'starting' | 'progress' | 'complete' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage('');
    setProgress(0);
    setData(null);
    setError(null);
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const pollJobStatus = useCallback(async (jobId: string) => {
    let attempts = 0;
    const maxAttempts = 120; // 4 minutes (2 second intervals)

    const poll = async () => {
      attempts++;
      
      try {
        console.log(`📊 Polling attempt ${attempts}/${maxAttempts} for job ${jobId}`);
        
        const response = await fetch(
          `${API_BASE_URL}/api/analyze-metrics-status/${jobId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );

        const result = await response.json();

        if (result.status === 'complete') {
          console.log('✅ Job complete!');
          setStatus('complete');
          setMessage('Analysis complete!');
          setProgress(100);
          setData(result.data);
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
          return;
        }

        if (result.status === 'error') {
          console.error('❌ Job failed:', result.error);
          setStatus('error');
          setError(result.error || 'Analysis failed');
          setMessage('Analysis failed');
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
          return;
        }

        // Still running - update progress
        const estimatedProgress = Math.min(90, 10 + (attempts * 0.7));
        setProgress(estimatedProgress);
        setMessage(`Analyzing... ${Math.round(estimatedProgress)}% (${attempts * 2}s elapsed)`);

        // Check timeout
        if (attempts >= maxAttempts) {
          setStatus('error');
          setError('Analysis timed out after 4 minutes');
          setMessage('Timeout - please try again');
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }

      } catch (err) {
        console.error('Polling error:', err);
        // Don't fail immediately on polling errors, keep trying
        if (attempts >= maxAttempts) {
          setStatus('error');
          setError('Failed to check status');
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      }
    };

    // Start polling every 2 seconds
    pollingRef.current = window.setInterval(poll, 2000);
    poll(); // Call immediately

  }, []);

  const analyze = useCallback(async (hotelName: string, city: string, state: string = '') => {
    reset();
    setStatus('starting');
    setMessage('Starting analysis...');
    setProgress(5);

    try {
      console.log('🚀 Starting async analysis...');
      
      // Start the async job
      const response = await fetch(`${API_BASE_URL}/api/analyze-metrics-async`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel_name: hotelName,
          city,
          state,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to start analysis');
      }

      console.log('✅ Job started:', result.job_id);
      setStatus('progress');
      setMessage('Analysis job started - waiting for results...');
      setProgress(10);

      // Start polling for results
      await pollJobStatus(result.job_id);

    } catch (err) {
      console.error('❌ Analysis error:', err);
      setStatus('error');
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      setMessage('Failed to start analysis: ' + errorMsg);
    }
  }, [reset, pollJobStatus]);

  return {
    analyze,
    status,
    message,
    progress,
    data,
    error,
    isLoading: ['starting', 'progress'].includes(status),
    reset,
  };
}

// Example component
export function AsyncAnalysisExample() {
  const { analyze, status, message, progress, data, error, isLoading } = useAsyncAnalysis();

  const handleAnalyze = () => {
    analyze('Grand Plaza Hotel', 'Chicago', 'Illinois');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Async Analysis (Polling)</h2>
      
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition"
      >
        {isLoading ? 'Analyzing...' : 'Start Analysis'}
      </button>

      {isLoading && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-purple-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-600">
            Status: {status} | {message}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            ✅ Analysis Complete!
          </h3>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Overall Score:</span> {data.overallScore}/100
            </div>
            <div>
              <span className="font-semibold">Categories:</span> {Object.keys(data.categories || {}).length}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold hover:text-green-700">
                View Full Results
              </summary>
              <pre className="mt-2 p-4 bg-white rounded text-xs overflow-auto max-h-96">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
