// src/components/audit/ScoreGauge.tsx
// Circular grade badge component (A+ to F)
// Created: November 16, 2025

import { cn } from "@/lib/utils";
import type { Grade } from "@/types/audit";
import { getGradeColor, getScoreBadgeClass } from "@/lib/constants/colors";

interface ScoreGaugeProps {
  grade: Grade;
  score: number;
  size?: "sm" | "md" | "lg" | "xl";
  showScore?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16 text-lg",
  md: "w-24 h-24 text-2xl",
  lg: "w-32 h-32 text-3xl",
  xl: "w-40 h-40 text-4xl",
};

export function ScoreGauge({
  grade,
  score,
  size = "lg",
  showScore = true,
  className,
}: ScoreGaugeProps) {
  const color = getGradeColor(grade);
  
  const colorClasses = {
    green: "bg-green-500 ring-green-200 shadow-green-200",
    amber: "bg-amber-500 ring-amber-200 shadow-amber-200",
    red: "bg-red-500 ring-red-200 shadow-red-200",
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex flex-col items-center justify-center font-bold text-white ring-4 shadow-lg",
          sizeClasses[size],
          colorClasses[color]
        )}
      >
        <span className="leading-none">{grade}</span>
        {showScore && (
          <span className="text-xs font-medium opacity-90 mt-1">
            {score}/100
          </span>
        )}
      </div>
    </div>
  );
}

// Alternative: Progress Ring Gauge
interface ProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  score,
  size = 120,
  strokeWidth = 8,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const remaining = circumference - progress;

  // Color based on score
  const getColor = () => {
    if (score >= 75) return "#10b981"; // green
    if (score >= 50) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progress} ${remaining}`}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Score text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{score}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wide">Score</span>
      </div>
    </div>
  );
}
