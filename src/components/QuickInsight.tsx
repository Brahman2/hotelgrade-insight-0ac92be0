import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickInsightProps {
  title: string;
  items: string[];
  variant: "success" | "warning" | "info";
}

const variantStyles = {
  success: "border-green-500 bg-green-50 dark:bg-green-950/30",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
};

const variantTitleColors = {
  success: "text-green-700 dark:text-green-400",
  warning: "text-yellow-700 dark:text-yellow-400",
  info: "text-blue-700 dark:text-blue-400",
};

export const QuickInsight = ({ title, items, variant }: QuickInsightProps) => {
  return (
    <Card className={cn("p-6 border-2", variantStyles[variant])}>
      <h3 className={cn("font-semibold text-lg mb-4", variantTitleColors[variant])}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-foreground flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
