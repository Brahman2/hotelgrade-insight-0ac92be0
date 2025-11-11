import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  score: number;
  status: "Leading" | "Competitive" | "Lagging";
  marketAverage: number;
  topCompetitor: number;
  keyFinding: string;
  details?: {
    metrics: string[];
    actionItems: string[];
  };
}

const statusColors = {
  Leading: "bg-green-500 text-white",
  Competitive: "bg-blue-500 text-white",
  Lagging: "bg-orange-500 text-white",
};

const scoreColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
};

export const CategoryCard = ({
  icon: Icon,
  name,
  score,
  status,
  marketAverage,
  topCompetitor,
  keyFinding,
  details,
}: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{score}/100</p>
            </div>
          </div>
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={score} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Your Score</span>
            <span className={cn("font-semibold", score >= 70 ? "text-green-600" : "text-orange-600")}>
              {score}%
            </span>
          </div>
        </div>

        {/* Market Comparison */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Market Avg</p>
            <p className="font-semibold text-foreground">{marketAverage}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Top Competitor</p>
            <p className="font-semibold text-foreground">{topCompetitor}</p>
          </div>
        </div>

        {/* Key Finding */}
        <p className="text-sm text-muted-foreground italic">{keyFinding}</p>

        {/* Expand Button */}
        {details && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                View Details
              </>
            )}
          </Button>
        )}

        {/* Expanded Content */}
        {isExpanded && details && (
          <div className="space-y-4 pt-4 border-t animate-fade-in">
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Detailed Metrics</h4>
              <ul className="space-y-1">
                {details.metrics.map((metric, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Action Items</h4>
              <ul className="space-y-1">
                {details.actionItems.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1">{index + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
