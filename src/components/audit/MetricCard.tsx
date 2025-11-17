import React from 'react';
import { Card } from '@/components/ui/card';
import { Lock, TrendingUp, TrendingDown, Minus, Eye } from 'lucide-react';

/**
 * HYBRID PREVIEW VERSION
 * Date: November 16, 2025
 * Strategy: Show titles, scores, status - Blur insights & recommendations
 * 
 * Psychology: Users see their problems but need to unlock for solutions
 * Expected conversion lift: 50-80%
 */

interface MetricCardProps {
  title: string;
  score: number;
  status: 'good' | 'warning' | 'critical';
  insight: string;
  recommendation: string;
  isLocked: boolean;
  onUnlock?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  score,
  status,
  insight,
  recommendation,
  isLocked,
  onUnlock
}) => {
  // Determine colors based on status
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = () => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getTrendIcon = () => {
    if (score >= 75) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (score >= 50) return <Minus className="w-4 h-4 text-amber-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      {/* Header - ALWAYS VISIBLE */}
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex-1">{title}</h4>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            {score}
          </span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
      </div>

      {/* Status Badge - ALWAYS VISIBLE */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusColor()} border`}>
        {status === 'good' && '✓ Good'}
        {status === 'warning' && '⚠ Needs Attention'}
        {status === 'critical' && '✕ Critical'}
      </div>

      {/* Insight Section - LOCKED/UNLOCKED */}
      <div className="mb-4 relative">
        <p className="text-sm font-medium text-gray-700 mb-1">Key Finding:</p>
        
        {isLocked ? (
          // LOCKED STATE: Show preview with blur
          <div className="relative">
            <p className="text-sm text-gray-600 leading-relaxed blur-sm select-none">
              {insight}
            </p>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-white/50 to-white">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Lock className="w-3 h-3" />
                <span className="font-medium">Unlock to read full insight</span>
              </div>
            </div>
          </div>
        ) : (
          // UNLOCKED STATE: Show full text
          <p className="text-sm text-gray-600 leading-relaxed">{insight}</p>
        )}
      </div>

      {/* Recommendation Section - LOCKED/UNLOCKED */}
      <div className={`rounded-lg p-3 relative ${isLocked ? 'bg-gray-50 border border-gray-200' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`text-xs font-semibold mb-1 ${isLocked ? 'text-gray-700' : 'text-blue-900'}`}>
          💡 Recommendation:
        </p>
        
        {isLocked ? (
          // LOCKED STATE: Show preview with blur
          <div className="relative">
            <p className="text-xs text-gray-600 leading-relaxed blur-sm select-none">
              {recommendation}
            </p>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-white/50 to-white">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Eye className="w-3 h-3" />
                <span className="font-medium">Unlock to see action steps</span>
              </div>
            </div>
          </div>
        ) : (
          // UNLOCKED STATE: Show full text
          <p className="text-xs text-blue-800 leading-relaxed">{recommendation}</p>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;
