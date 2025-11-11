import { cn } from "@/lib/utils";

interface GradeBadgeProps {
  grade: string;
  score: number;
  size?: "sm" | "md" | "lg";
}

const gradeColors = {
  A: "bg-green-500 border-green-600",
  "B+": "bg-blue-500 border-blue-600",
  B: "bg-blue-500 border-blue-600",
  "B-": "bg-blue-400 border-blue-500",
  "C+": "bg-yellow-500 border-yellow-600",
  C: "bg-yellow-500 border-yellow-600",
  "C-": "bg-yellow-400 border-yellow-500",
  D: "bg-orange-500 border-orange-600",
  F: "bg-red-500 border-red-600",
};

const sizeClasses = {
  sm: "w-20 h-20 text-2xl",
  md: "w-32 h-32 text-4xl",
  lg: "w-40 h-40 text-5xl",
};

export const GradeBadge = ({ grade, score, size = "lg" }: GradeBadgeProps) => {
  const colorClass = gradeColors[grade as keyof typeof gradeColors] || gradeColors.C;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "rounded-full border-4 flex items-center justify-center font-bold text-white shadow-lg",
          colorClass,
          sizeClasses[size]
        )}
      >
        {grade}
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-foreground">{score}/100</p>
        <p className="text-sm text-muted-foreground">Overall Score</p>
      </div>
    </div>
  );
};
