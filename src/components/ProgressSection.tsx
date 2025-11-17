import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Globe, 
  Star, 
  Monitor,
  Hotel,
  Share2,
  Target,
  CheckCircle,
  Loader2
} from "lucide-react";

interface ProgressSectionProps {
  isComplete?: boolean;
  competitorCount?: number;
}

export const ProgressSection = ({ isComplete = false, competitorCount = 0 }: ProgressSectionProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { 
      icon: MapPin, 
      label: "Finding hotel & competitors",
      detail: "Locating your property and nearby hotels",
      duration: 800
    },
    { 
      icon: Globe, 
      label: "Checking Google Business Profile",
      detail: "Analyzing local search presence",
      duration: 1000
    },
    { 
      icon: Star, 
      label: "Analyzing reviews across platforms",
      detail: "Scanning Google, TripAdvisor, Booking.com",
      duration: 1200
    },
    { 
      icon: Monitor, 
      label: "Testing website performance",
      detail: "Checking speed, mobile experience, SEO",
      duration: 1000
    },
    { 
      icon: Hotel, 
      label: "Scanning OTA presence",
      detail: "Evaluating listings on booking platforms",
      duration: 1000
    },
    { 
      icon: Share2, 
      label: "Checking social media",
      detail: "Analyzing Facebook, Instagram presence",
      duration: 800
    },
    { 
      icon: Target, 
      label: "Analyzing competitive position",
      detail: "Comparing against market competitors",
      duration: 1200
    },
  ];

  useEffect(() => {
    if (isComplete) {
      setProgress(100);
      setCurrentStep(steps.length);
      return;
    }

    // Simulate progress through steps
    let currentProgress = 0;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      currentProgress += 1.5;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setCurrentStep(steps.length);
        return;
      }
      
      // Update current step based on progress
      const progressPerStep = 100 / steps.length;
      stepIndex = Math.floor(currentProgress / progressPerStep);
      
      setProgress(currentProgress);
      setCurrentStep(stepIndex);
    }, 80);

    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {isComplete ? "Analysis Complete!" : "Analysis in Progress..."}
          </h3>
          {isComplete && competitorCount > 0 && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Found {competitorCount} competitors
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-1"
            style={{ width: `${progress}%` }}
          >
            {progress > 5 && (
              <span className="text-white text-xs font-medium">
                {Math.round(progress)}%
              </span>
            )}
          </div>
        </div>

        {/* Step List */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep && !isComplete;
            const isCompleted = index < currentStep || isComplete;
            const isPending = index > currentStep && !isComplete;
            
            return (
              <div 
                key={index} 
                className={`flex items-start gap-3 transition-all duration-300 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {/* Icon/Status */}
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : isActive ? (
                    <div className="bg-indigo-100 rounded-full p-1">
                      <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                    </div>
                  ) : (
                    <div className="bg-gray-200 rounded-full p-1">
                      <div className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <StepIcon className={`w-4 h-4 flex-shrink-0 ${
                      isCompleted ? 'text-green-600' :
                      isActive ? 'text-indigo-600' :
                      'text-gray-400'
                    }`} />
                    <p className={`font-medium ${
                      isCompleted ? 'text-green-700' :
                      isActive ? 'text-indigo-700' :
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {(isActive || isCompleted) && (
                    <p className="text-sm text-gray-600 mt-0.5 ml-6">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Status */}
        {isComplete ? (
          <div className="pt-4 border-t border-indigo-200">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <p className="font-medium">
                All checks complete! Your detailed analysis is ready below.
              </p>
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-indigo-200">
            <div className="flex items-center gap-2 text-indigo-700">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p className="font-medium">
                Running comprehensive analysis...
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
