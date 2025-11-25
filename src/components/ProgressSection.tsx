import { CheckCircle, Loader2, Image as ImageIcon, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ProgressSectionProps {
  isComplete: boolean;
  competitorCount: number;
  hotelName?: string;
  onAnalysisComplete?: () => void;
}

interface AnalysisStep {
  id: number;
  text: string;
  duration: number;
  previewType: 'images' | 'reviews' | 'rankings' | 'social' | 'ads' | 'competitors' | null;
}

const steps: AnalysisStep[] = [
  { id: 1, text: "Scanning digital presence...", duration: 2000, previewType: 'images' },
  { id: 2, text: "Analyzing online reviews...", duration: 2000, previewType: 'reviews' },
  { id: 3, text: "Evaluating social media...", duration: 1500, previewType: 'social' },
  { id: 4, text: "Checking advertising presence...", duration: 1500, previewType: 'ads' },
  { id: 5, text: "Assessing booking channels...", duration: 2000, previewType: 'rankings' },
  { id: 6, text: "Comparing with competitors...", duration: 2000, previewType: 'competitors' },
];

const mockImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
];

const mockReviews = [
  { text: "Excellent service and beautiful rooms!", rating: 5, source: "Google" },
  { text: "Great location, close to everything.", rating: 4, source: "TripAdvisor" },
  { text: "Staff was very friendly and helpful.", rating: 5, source: "Booking.com" },
];

const mockRankings = [
  { platform: "Booking.com", rank: "#3", total: 45, rating: 8.7 },
  { platform: "TripAdvisor", rank: "#5", total: 67, rating: 4.5 },
  { platform: "Google Maps", rank: "#2", total: 32, rating: 4.6 },
];

export function ProgressSection({ isComplete, competitorCount, hotelName, onAnalysisComplete }: ProgressSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    if (isComplete || currentStep >= steps.length) return;

    const step = steps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id]);

      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        onAnalysisComplete?.();
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, isComplete, onAnalysisComplete]);

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];

    switch (step.previewType) {
      case 'images':
        setPreviewData({ type: 'images', data: mockImages });
        break;
      case 'reviews':
        setPreviewData({ type: 'reviews', data: mockReviews });
        break;
      case 'rankings':
        setPreviewData({ type: 'rankings', data: mockRankings });
        break;
      default:
        setPreviewData(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (previewData?.type === 'images') {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % mockImages.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [previewData]);

  useEffect(() => {
    if (previewData?.type === 'reviews') {
      const interval = setInterval(() => {
        setReviewIndex((prev) => (prev + 1) % mockReviews.length);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [previewData]);

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
      <h3 className="font-semibold mb-4">Analyzing {hotelName || "your hotel"}...</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === idx;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isCurrent ? 'scale-105' : ''
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                )}
                <p className={`text-sm ${
                  isCompleted ? 'text-green-700 line-through' :
                  isCurrent ? 'text-foreground font-medium' :
                  'text-muted-foreground'
                }`}>
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-muted/30 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
          {previewData?.type === 'images' && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground mb-3">Scanning property images...</p>
              <img
                src={mockImages[imageIndex]}
                alt="Hotel preview"
                className="w-full h-32 object-cover rounded-md shadow-md animate-fade-in"
                key={imageIndex}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Image {imageIndex + 1} of {mockImages.length}
              </p>
            </div>
          )}

          {previewData?.type === 'reviews' && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="text-xs text-muted-foreground mb-3">Analyzing guest reviews...</p>
              <div
                className="bg-white p-3 rounded-md shadow-sm w-full animate-fade-in"
                key={reviewIndex}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {Array.from({ length: mockReviews[reviewIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {mockReviews[reviewIndex].source}
                  </span>
                </div>
                <p className="text-xs text-foreground">
                  "{mockReviews[reviewIndex].text}"
                </p>
              </div>
            </div>
          )}

          {previewData?.type === 'rankings' && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-3">Checking rankings...</p>
              <div className="w-full space-y-2">
                {mockRankings.map((ranking, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-2 rounded-md shadow-sm flex items-center justify-between animate-fade-in"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{ranking.rank}</span>
                      <div>
                        <p className="text-xs font-medium">{ranking.platform}</p>
                        <p className="text-xs text-muted-foreground">out of {ranking.total}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{ranking.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!previewData && (
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-muted-foreground animate-spin mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Processing...</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );