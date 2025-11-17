import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, AlertTriangle, Zap, CheckCircle, Target } from 'lucide-react';

interface ExecutiveSummaryProps {
  overallScore: number;
  overallGrade: string;
  competitiveRank: number;
  competitiveTotal: number;
  strengths: string[];
  criticalIssues: string[];
  keyFinding: string;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  overallScore,
  overallGrade,
  competitiveRank,
  competitiveTotal,
  strengths,
  criticalIssues,
  keyFinding
}) => {
  // Determine grade color based on score
  const getGradeColor = () => {
    if (overallScore >= 90) return 'bg-green-500';
    if (overallScore >= 80) return 'bg-green-400';
    if (overallScore >= 70) return 'bg-blue-500';
    if (overallScore >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getGradeTextColor = () => {
    if (overallScore >= 70) return 'text-green-700';
    if (overallScore >= 60) return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="space-y-6">
      {/* Overall Grade Card */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Executive Summary
              </h2>
              <p className="text-gray-600">
                Overall Performance Assessment
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ranked #{competitiveRank} of {competitiveTotal} comparable properties
              </p>
            </div>
            
            {/* Grade Badge */}
            <div className="flex flex-col items-center">
              <div className={`w-24 h-24 ${getGradeColor()} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-4xl font-bold text-white">{overallGrade}</span>
              </div>
              <p className={`text-sm font-semibold mt-2 ${getGradeTextColor()}`}>
                {overallScore}/100
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Finding Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">🎯 Key Finding</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                {keyFinding}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Grid - Only Strengths & Issues */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Strengths */}
        <Card className="border-2 border-green-200 bg-green-50/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-900">
                Top Strengths
              </h3>
            </div>
            
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-green-800 leading-relaxed">
                    {strength}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Critical Issues */}
        <Card className="border-2 border-red-200 bg-red-50/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-red-900">
                Critical Issues
              </h3>
            </div>
            
            <ul className="space-y-3">
              {criticalIssues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-800 leading-relaxed">
                    {issue}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
