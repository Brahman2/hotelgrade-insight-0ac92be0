import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * VERSION C: GREY BACKGROUND
 * Locked cards: Grey background + blurred text
 * Unlocked cards: White background + clear text
 * NO individual unlock buttons - section-level unlock only
 */

interface MetricCardProps {
  title: string;
  score: number;
  status?: 'good' | 'warning' | 'critical';
  insight: string;
  isLocked?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  score,
  status = 'good',
  insight,
  isLocked = false
}) => {
  // Determine status from score if not provided
  const actualStatus = status || (score >= 75 ? 'good' : score >= 50 ? 'warning' : 'critical');

  // Colors based on status
  const statusColors = {
    good: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    critical: 'text-red-600 bg-red-50 border-red-200'
  };

  const scoreColors = {
    good: 'text-green-600',
    warning: 'text-amber-600',
    critical: 'text-red-600'
  };

  const getTrendIcon = () => {
    if (score >= 75) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (score >= 50) return <Minus className="w-4 h-4 text-amber-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  // Background color based on locked state
  const bgColor = isLocked ? 'bg-gray-100' : 'bg-white';
  const borderColor = isLocked ? 'border-gray-300' : 'border-gray-200';

  return (
    <Card 
      className={`p-6 ${bgColor} ${borderColor} border transition-all duration-300 ease-in-out hover:shadow-md`}
    >
      {/* Header - ALWAYS VISIBLE */}
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex-1">{title}</h4>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-2xl font-bold ${scoreColors[actualStatus]}`}>
            {score}
          </span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
      </div>

      {/* Status Badge - ALWAYS VISIBLE */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${statusColors[actualStatus]} border`}>
        {actualStatus === 'good' && '✓ Good'}
        {actualStatus === 'warning' && '⚠ Needs Attention'}
        {actualStatus === 'critical' && '✕ Critical'}
      </div>

      {/* Insight - BLURRED if locked */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Key Finding:</p>
        <p 
          className={`text-sm text-gray-600 leading-relaxed transition-all duration-300 ${
            isLocked ? 'blur-sm select-none' : ''
          }`}
          style={{ filter: isLocked ? 'blur(4px)' : 'none' }}
        >
          {insight}
        </p>
      </div>
    </Card>
  );
};

export default MetricCard;
