import React from 'react';
import { Card } from '@/components/ui/card';
import { Lock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MetricDetail } from "@/types/audit";

interface MetricCardProps {
  metric: MetricDetail;
  onUnlockClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  onUnlockClick
}) => {
  const { label, score, color, insight, recommendation, isLocked, value } = metric;
  
  // Map color to status
  const status = color === 'green' ? 'good' : color === 'amber' ? 'warning' : 'critical';
  
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
    if (!score) return 'text-gray-600';
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getTrendIcon = () => {
    if (!score) return null;
    if (score >= 75) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (score >= 50) return <Minus className="w-4 h-4 text-amber-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <Card className={`p-6 hover:shadow-lg transition-all ${isLocked ? 'relative' : ''}`}>
      {/* Locked Overlay - Only show lock icon when locked */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">Unlock to view details</p>
            {onUnlockClick && (
              <button
                onClick={onUnlockClick}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Unlock Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className={isLocked ? 'blur-sm' : ''}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex-1">{label}</h4>
          {score !== null && (
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <span className={`text-2xl font-bold ${getScoreColor()}`}>
                {score}
              </span>
              <span className="text-sm text-gray-500">/100</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        {score !== null && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusColor()} border`}>
            {status === 'good' && '✓ Good'}
            {status === 'warning' && '⚠ Needs Attention'}
            {status === 'critical' && '✕ Critical'}
          </div>
        )}

        {/* Value Display */}
        {value && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">{value}</p>
          </div>
        )}

        {/* Insight */}
        {insight && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Key Finding:</p>
            <p className="text-sm text-gray-600 leading-relaxed">{insight}</p>
          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-900 mb-1">💡 Recommendation:</p>
            <p className="text-xs text-blue-800 leading-relaxed">{recommendation}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;
