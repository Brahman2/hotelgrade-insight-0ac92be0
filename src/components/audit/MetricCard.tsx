import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Target, Zap, TrendingUp as TrendingUpIcon, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * VERSION C: GREY BACKGROUND + ACCORDION DETAILS
 * Locked cards: Grey background + blurred text (visible but unreadable)
 * Unlocked cards: White background + clear text + expandable details
 * NO individual unlock buttons - section-level unlock only
 */

interface MetricCardProps {
  title: string;
  score: number;
  status?: 'good' | 'warning' | 'critical';
  insight: string;
  isLocked?: boolean;
  recommendation?: string;
  detailedAnalysis?: string;
  actionSteps?: string[];
  expectedImpact?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  score,
  status,
  insight,
  isLocked = false,
  recommendation,
  detailedAnalysis,
  actionSteps = [],
  expectedImpact
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate status from score (prioritize calculated status over passed status)
  const actualStatus = score >= 75 ? 'good' : score >= 50 ? 'warning' : 'critical';
  
  // Check if we have detailed content to show
  const hasDetailedContent = !isLocked && (detailedAnalysis || actionSteps.length > 0 || expectedImpact);

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

      {/* Insight - BLURRED if locked, with better visibility */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Key Finding:</p>
        <div className="relative">
          <p 
            className={`text-sm text-gray-600 leading-relaxed transition-all duration-300 ${
              isLocked ? 'select-none' : ''
            }`}
            style={{ 
              filter: isLocked ? 'blur(3px)' : 'none',
              WebkitFilter: isLocked ? 'blur(3px)' : 'none',
              color: isLocked ? '#666' : '#4b5563',
              opacity: isLocked ? 0.7 : 1
            }}
          >
            {insight}
          </p>
          {isLocked && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 via-transparent to-gray-100/20 pointer-events-none"></div>
          )}
        </div>
      </div>

      {/* Recommendation - show when unlocked and exists */}
      {!isLocked && recommendation && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-900 mb-1">💡 Quick Recommendation:</p>
          <p className="text-xs text-blue-800 leading-relaxed">{recommendation}</p>
        </div>
      )}

      {/* Accordion Toggle - only show if unlocked and has detailed content */}
      {hasDetailedContent && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {isExpanded ? 'Hide' : 'Show'} Detailed Analysis
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
              {/* Detailed Analysis */}
              {detailedAnalysis && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                    📊 Detailed Analysis
                  </h5>
                  <p className="text-sm text-indigo-800 leading-relaxed">{detailedAnalysis}</p>
                </div>
              )}

              {/* Action Steps */}
              {actionSteps.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Action Steps
                  </h5>
                  <ol className="space-y-2">
                    {actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                        <span className="font-bold text-green-600 flex-shrink-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Expected Impact */}
              {expectedImpact && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <TrendingUpIcon className="w-4 h-4" />
                    Expected Impact
                  </h5>
                  <p className="text-sm text-amber-800 leading-relaxed">{expectedImpact}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
