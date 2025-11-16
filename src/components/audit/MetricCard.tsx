// src/components/audit/MetricCard.tsx
// Individual metric card with optional lock overlay
// Created: November 16, 2025

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MetricDetail } from "@/types/audit";
import {
  getScoreBgClass,
  getScoreBorderClass,
  getScoreTextClass,
  getScoreBadgeClass,
} from "@/lib/constants/colors";

interface MetricCardProps {
  metric: MetricDetail;
  onUnlockClick?: () => void;
  className?: string;
}

export function MetricCard({ metric, onUnlockClick, className }: MetricCardProps) {
  const isLocked = metric.isLocked || metric.score === null;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover:shadow-md",
        !isLocked && getScoreBorderClass(metric.color),
        !isLocked && "border-l-4",
        className
      )}
    >
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/95 to-gray-200/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4">
          <Lock className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center mb-3">
            {metric.insight || "Enter your email to unlock detailed analysis"}
          </p>
          {onUnlockClick && (
            <button
              onClick={onUnlockClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Unlock Now
            </button>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            {metric.label}
          </CardTitle>
          {!isLocked && metric.score !== null && (
            <Badge className={cn("ml-2", getScoreBadgeClass(metric.color))}>
              {metric.score}/100
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Value Display */}
        {!isLocked && metric.value && (
          <div
            className={cn(
              "px-3 py-2 rounded-md",
              getScoreBgClass(metric.color)
            )}
          >
            <p className={cn("text-sm font-medium", getScoreTextClass(metric.color))}>
              {metric.value}
            </p>
          </div>
        )}

        {/* Insight */}
        {!isLocked && metric.insight && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Insight
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {metric.insight}
            </p>
          </div>
        )}

        {/* Recommendation */}
        {!isLocked && metric.recommendation && (
          <div className="space-y-1 pt-2 border-t border-gray-100">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Recommendation
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {metric.recommendation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
