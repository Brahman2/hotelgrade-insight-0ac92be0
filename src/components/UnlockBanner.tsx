import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Mail } from 'lucide-react';

interface UnlockBannerProps {
  sectionTitle: string;
  lockedCount: number;
  onUnlock: () => void;
}

export const UnlockBanner: React.FC<UnlockBannerProps> = ({
  sectionTitle,
  lockedCount,
  onUnlock
}) => {
  return (
    <div className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 shadow-lg">
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Lock className="w-8 h-8" />
          <h3 className="text-2xl font-bold">
            Unlock {lockedCount} More Insight{lockedCount !== 1 ? 's' : ''} for {sectionTitle}
          </h3>
        </div>
        
        <p className="text-blue-100 text-lg mb-6">
          Get detailed findings and actionable recommendations for all metrics. 
          See exactly how to improve your score.
        </p>
        
        <Button
          onClick={onUnlock}
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
        >
          <Mail className="w-5 h-5 mr-2" />
          Unlock Full Analysis
        </Button>
      </div>
    </div>
  );
};
