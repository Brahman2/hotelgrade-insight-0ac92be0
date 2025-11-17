// src/pages/ResultsTeaser.tsx
// Teaser page showing free preview of audit with locked sections
// Created: November 16, 2025

import { useState } from "react";
import { useParams } from "react-router-dom";
import MetricCard from "@/components/audit/MetricCard";
import { ScoreGauge, ProgressRing } from "@/components/audit/ScoreGauge";
import { EmailCaptureModal } from "@/components/audit/EmailCaptureModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Mail,
  Globe,
  Star,
  Share2,
  Megaphone,
  Calendar,
} from "lucide-react";
import { MOCK_AUDIT_REPORT } from "@/lib/mockData";
import type { SectionName } from "@/types/audit";

export default function ResultsTeaser() {
  const { hotelId } = useParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionName | "all" | null>(null);
  
  // In production, fetch real data based on hotelId
  // For now, use mock data
  const report = MOCK_AUDIT_REPORT;

  const handleUnlockSection = (section: SectionName | "all") => {
    setSelectedSection(section);
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (email: string) => {
    console.log("Email submitted:", email, "for section:", selectedSection);
    // In production, call API endpoint to capture email and send report
    // await fetch('/api/reports/unlock', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, hotelId, section: selectedSection })
    // });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const sectionIcons = {
    digitalPresence: Globe,
    reputation: Star,
    socialMedia: Share2,
    advertising: Megaphone,
    booking: Calendar,
    competitive: TrendingUp,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            Hotel Performance Report
          </h1>
          <p className="text-lg text-gray-600">
            {report.hotelName} • {report.city}, {report.state}
          </p>
          <Badge variant="outline" className="text-sm">
            Generated: {new Date(report.generatedAt).toLocaleDateString()}
          </Badge>
        </div>

        {/* Executive Summary - Always Free */}
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left: Score Gauge */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <ScoreGauge 
                  grade={report.executiveSummary.overallGrade}
                  score={report.executiveSummary.overallScore}
                  size="xl"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Overall Performance
                  </p>
                  <p className="text-sm text-gray-500">
                    Rank #{report.executiveSummary.competitiveRank} of{" "}
                    {report.executiveSummary.competitiveTotal} hotels
                  </p>
                </div>
              </div>

              {/* Right: Strengths & Issues */}
              <div className="space-y-6">
                
                {/* Strengths */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Top Strengths
                  </h3>
                  <ul className="space-y-2">
                    {report.executiveSummary.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Critical Issues */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Critical Issues
                  </h3>
                  <ul className="space-y-2">
                    {report.executiveSummary.criticalIssues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Finding */}
            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-2">
                🎯 Key Finding
              </h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                {report.executiveSummary.keyFinding}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section Previews - Teaser + Locked */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Detailed Analysis
          </h2>

          {/* Digital Presence */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Digital Presence
                  <Badge className="bg-blue-500">
                    {report.digitalPresence.score}/100
                  </Badge>
                </CardTitle>
                <Button
                  onClick={() => handleUnlockSection("digitalPresence")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Unlock Full Analysis
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.digitalPresence.metrics.slice(0, 3).map((metric, i) => (
                  <MetricCard
                    key={i}
                    title={metric.label}
                    score={metric.score || 0}
                    status={metric.color === 'green' ? 'good' : metric.color === 'amber' ? 'warning' : 'critical'}
                    insight={metric.insight || ''}
                    recommendation={metric.recommendation || ''}
                    isLocked={metric.isLocked || false}
                    onUnlock={() => handleUnlockSection("digitalPresence")}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                + 4 more metrics available with full report
              </p>
            </CardContent>
          </Card>

          {/* Reputation */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-600" />
                  Reputation Management
                  <Badge className="bg-green-500">
                    {report.reputation.score}/100
                  </Badge>
                </CardTitle>
                <Button
                  onClick={() => handleUnlockSection("reputation")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Unlock Full Analysis
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.reputation.metrics.slice(0, 3).map((metric, i) => (
                  <MetricCard
                    key={i}
                    title={metric.label}
                    score={metric.score || 0}
                    status={metric.color === 'green' ? 'good' : metric.color === 'amber' ? 'warning' : 'critical'}
                    insight={metric.insight || ''}
                    recommendation={metric.recommendation || ''}
                    isLocked={metric.isLocked || false}
                    onUnlock={() => handleUnlockSection("reputation")}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                + 4 more metrics available with full report
              </p>
            </CardContent>
          </Card>

          {/* Social Media - Abbreviated for brevity */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-pink-600" />
                  Social Media
                  <Badge className="bg-amber-500">
                    {report.socialMedia.score}/100
                  </Badge>
                </CardTitle>
                <Button
                  onClick={() => handleUnlockSection("socialMedia")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Unlock Full Analysis
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {report.socialMedia.metrics.slice(0, 2).map((metric, i) => (
                  <MetricCard
                    key={i}
                    title={metric.label}
                    score={metric.score || 0}
                    status={metric.color === 'green' ? 'good' : metric.color === 'amber' ? 'warning' : 'critical'}
                    insight={metric.insight || ''}
                    recommendation={metric.recommendation || ''}
                    isLocked={metric.isLocked || false}
                    onUnlock={() => handleUnlockSection("socialMedia")}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                + 4 more metrics available with full report
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA to unlock everything */}
        <Card className="border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="pt-6 text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Ready for the Complete 40-Point Audit?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get instant access to all metrics, competitor analysis, and a prioritized
              action plan delivered straight to your inbox.
            </p>
            <Button
              onClick={() => handleUnlockSection("all")}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Unlock Complete Report
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
        section={selectedSection}
        hotelName={report.hotelName}
      />
    </div>
  );
}
