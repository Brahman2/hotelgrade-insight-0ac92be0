import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProgressSectionProps {
  isComplete: boolean;
  competitorCount: number;
}

const steps = [
  "Scanning digital presence...",
  "Analyzing online reviews...",
  "Evaluating social media...",
  "Checking advertising presence...",
  "Assessing booking channels...",
  "Comparing with competitors...",
];

export function ProgressSection({ isComplete, competitorCount }: ProgressSectionProps) {
  if (isComplete) {
    return (
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Analysis Complete!</p>
            <p className="text-sm text-green-700">
              Analyzed {competitorCount} nearby competitors
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Analyzing your hotel...</h3>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">{step}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
