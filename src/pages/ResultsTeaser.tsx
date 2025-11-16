// src/pages/ResultsTeaser.tsx
// COMPLETE teaser page with ALL 6 sections + WORKING unlock flow
// Created: November 16, 2025 - FULL INTERACTIVE VERSION

import { useState } from "react";
import { useParams } from "react-router-dom";
import { MetricCard } from "@/components/audit/MetricCard";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
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
  Trophy,
  Rocket,
  Clock,
  Target,
  Unlock,
} from "lucide-react";
import { MOCK_AUDIT_REPORT } from "@/lib/mockData";
import type { SectionName } from "@/types/audit";
import { PRIORITY_COLORS, EFFORT_LABELS } from "@/lib/constants/colors";

export default function ResultsTeaser() {
  const { hotelId } = useParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionName | "all" | null>(null);
  
  // Track which sections are unlocked
  const [unlockedSections, setUnlockedSections] = useState<Set<SectionName | "all">>(new Set());
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null);
  
  const report = MOCK_AUDIT_REPORT;

  const handleUnlockSection = (section: SectionName | "all") => {
    setSelectedSection(section);
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (email: string) => {
    console.log("Email submitted:", email, "for section:", selectedSection);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store email and unlock content
    setCapturedEmail(email);
    
    if (selectedSection) {
      if (selectedSection === "all") {
        // Unlock everything
        setUnlockedSections(new Set([
          "all",
          "digitalPresence",
          "reputation", 
          "socialMedia",
          "advertising",
          "booking",
          "competitive"
        ]));
      } else {
        // Unlock specific section
        setUnlockedSections(prev => new Set(prev).add(selectedSection));
      }
    }
  };

  // Helper to check if section is unlocked
  const isSectionUnlocked = (section: SectionName) => {
    return unlockedSections.has("all") || unlockedSections.has(section);
  };

  const isEverythingUnlocked = unlockedSections.has("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Success Banner - Show after email capture */}
        {capturedEmail && (
          <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-bold text-green-900 text-lg">
                    Report Unlocked! 🎉
                  </h3>
                  <p className="text-sm text-green-700">
                    Full analysis sent to <strong>{capturedEmail}</strong>. 
                    {isEverythingUnlocked 
                      ? " All sections unlocked below!" 
                      : " Unlocked sections are highlighted in green below!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Key Finding
              </h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                {report.executiveSummary.keyFinding}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section Previews - ALL 6 SECTIONS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Detailed 40-Point Analysis
            </h2>
            {!isEverythingUnlocked && (
              <Button
                onClick={() => handleUnlockSection("all")}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Unlock All Sections
              </Button>
            )}
          </div>

          {/* 1. DIGITAL PRESENCE */}
          <Card className={isSectionUnlocked("digitalPresence") ? "border-2 border-green-500" : ""}>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Digital Presence
                  <Badge className="bg-blue-500">
                    {report.digitalPresence.score}/100
                  </Badge>
                  {isSectionUnlocked("digitalPresence") && (
                    <Badge className="bg-green-500">
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </CardTitle>
                {!isSectionUnlocked("digitalPresence") && (
                  <Button
                    onClick={() => handleUnlockSection("digitalPresence")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unlock Full Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(isSectionUnlocked("digitalPresence") 
                  ? report.digitalPresence.metrics 
                  : report.digitalPresence.metrics.slice(0, 3)
                ).map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={{
                      ...metric,
                      isLocked: isSectionUnlocked("digitalPresence") ? false : metric.isLocked,
                      score: isSectionUnlocked("digitalPresence") ? (metric.score || 70) : metric.score,
                    }}
                    onUnlockClick={() => handleUnlockSection("digitalPresence")}
                  />
                ))}
              </div>
              {!isSectionUnlocked("digitalPresence") && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  + {report.digitalPresence.metrics.length - 3} more metrics available with full report
                </p>
              )}
            </CardContent>
          </Card>

          {/* 2. REPUTATION MANAGEMENT */}
          <Card className={isSectionUnlocked("reputation") ? "border-2 border-green-500" : ""}>
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-600" />
                  Reputation Management
                  <Badge className="bg-green-500">
                    {report.reputation.score}/100
                  </Badge>
                  {isSectionUnlocked("reputation") && (
                    <Badge className="bg-green-500">
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </CardTitle>
                {!isSectionUnlocked("reputation") && (
                  <Button
                    onClick={() => handleUnlockSection("reputation")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unlock Full Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(isSectionUnlocked("reputation")
                  ? report.reputation.metrics
                  : report.reputation.metrics.slice(0, 3)
                ).map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={{
                      ...metric,
                      isLocked: isSectionUnlocked("reputation") ? false : metric.isLocked,
                      score: isSectionUnlocked("reputation") ? (metric.score || 75) : metric.score,
                    }}
                    onUnlockClick={() => handleUnlockSection("reputation")}
                  />
                ))}
              </div>
              {!isSectionUnlocked("reputation") && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  + {report.reputation.metrics.length - 3} more metrics available
                </p>
              )}
            </CardContent>
          </Card>

          {/* 3. SOCIAL MEDIA */}
          <Card className={isSectionUnlocked("socialMedia") ? "border-2 border-green-500" : ""}>
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-pink-600" />
                  Social Media Performance
                  <Badge className="bg-amber-500">
                    {report.socialMedia.score}/100
                  </Badge>
                  {isSectionUnlocked("socialMedia") && (
                    <Badge className="bg-green-500">
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </CardTitle>
                {!isSectionUnlocked("socialMedia") && (
                  <Button
                    onClick={() => handleUnlockSection("socialMedia")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unlock Full Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {(isSectionUnlocked("socialMedia")
                  ? report.socialMedia.metrics
                  : report.socialMedia.metrics.slice(0, 2)
                ).map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={{
                      ...metric,
                      isLocked: isSectionUnlocked("socialMedia") ? false : metric.isLocked,
                      score: isSectionUnlocked("socialMedia") ? (metric.score || 65) : metric.score,
                    }}
                    onUnlockClick={() => handleUnlockSection("socialMedia")}
                  />
                ))}
              </div>
              {!isSectionUnlocked("socialMedia") && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  + {report.socialMedia.metrics.length - 2} more metrics available
                </p>
              )}
            </CardContent>
          </Card>

          {/* 4. ADVERTISING & PAID MEDIA */}
          <Card className={isSectionUnlocked("advertising") ? "border-2 border-green-500" : ""}>
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3">
                  <Megaphone className="w-6 h-6 text-orange-600" />
                  Advertising & Paid Media
                  <Badge className="bg-amber-500">
                    {report.advertising.score}/100
                  </Badge>
                  {isSectionUnlocked("advertising") && (
                    <Badge className="bg-green-500">
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </CardTitle>
                {!isSectionUnlocked("advertising") && (
                  <Button
                    onClick={() => handleUnlockSection("advertising")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unlock Full Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(isSectionUnlocked("advertising")
                  ? report.advertising.metrics
                  : [
                      report.advertising.metrics[0],
                      { score: null, color: 'red' as const, label: 'Meta Ads Presence', isLocked: true, insight: 'Unlock to see Facebook & Instagram ads' },
                      { score: null, color: 'red' as const, label: 'Metasearch Visibility', isLocked: true, insight: 'Unlock to see Google Hotel Ads' },
                    ]
                ).map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={{
                      ...metric,
                      isLocked: isSectionUnlocked("advertising") ? false : metric.isLocked,
                      score: isSectionUnlocked("advertising") ? (metric.score || 55) : metric.score,
                    }}
                    onUnlockClick={() => handleUnlockSection("advertising")}
                  />
                ))}
              </div>
              {!isSectionUnlocked("advertising") && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  + {report.advertising.metrics.length - 3} more metrics available
                </p>
              )}
            </CardContent>
          </Card>

          {/* 5. BOOKING & DISTRIBUTION */}
          <Card className={isSectionUnlocked("booking") ? "border-2 border-green-500" : ""}>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                  Booking & Distribution
                  <Badge className="bg-green-500">
                    {report.booking.score}/100
                  </Badge>
                  {isSectionUnlocked("booking") && (
                    <Badge className="bg-green-500">
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </CardTitle>
                {!isSectionUnlocked("booking") && (
                  <Button
                    onClick={() => handleUnlockSection("booking")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unlock Full Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {(isSectionUnlocked("booking")
                  ? report.booking.metrics
                  : report.booking.metrics.slice(0, 2)
                ).map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={{
                      ...metric,
                      isLocked: isSectionUnlocked("booking") ? false : metric.isLocked,
                      score: isSectionUnlocked("booking") ? (metric.score || 75) : metric.score,
                    }}
                    onUnlockClick={() => handleUnlockSection("booking")}
                  />
                ))}
              </div>
              {!isSectionUnlocked("booking") && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  + {report.booking.metrics.length - 2} more metrics available
                </p>
              )}
            </CardContent>
          </Card>

          {/* 6. COMPETITIVE INTELLIGENCE */}
          <Card className={isSectionUnlocked("competitive") ? "border-2 border-green-500" : ""}>
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-purple-600" />
                  Competitive Intelligence
                  <Badge className="bg-amber-500">
                    {report.competitive.score}/100
                  </Badge>
                  {isSectionUnlocked("competitive") && (
                    <Badge className="bg-green-500">
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </CardTitle>
                {!isSectionUnlocked("competitive") && (
                  <Button
                    onClick={() => handleUnlockSection("competitive")}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unlock Full Analysis
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {(isSectionUnlocked("competitive")
                  ? report.competitive.metrics
                  : report.competitive.metrics.slice(0, 2)
                ).map((metric, i) => (
                  <MetricCard
                    key={i}
                    metric={{
                      ...metric,
                      isLocked: isSectionUnlocked("competitive") ? false : metric.isLocked,
                      score: isSectionUnlocked("competitive") ? (metric.score || 70) : metric.score,
                    }}
                    onUnlockClick={() => handleUnlockSection("competitive")}
                  />
                ))}
              </div>
              
              {/* Competitor Preview - Top 5 or All */}
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  {isSectionUnlocked("competitive") ? "All Competitors" : "Top 5 Competitors (Preview)"}
                </h4>
                <div className="space-y-2">
                  {(isSectionUnlocked("competitive") 
                    ? report.competitors 
                    : report.competitors.slice(0, 5)
                  ).map((comp, i) => (
                    <div key={i} className="flex items-center justify-between text-sm p-2 bg-white rounded">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                          #{comp.rank}
                        </Badge>
                        <div>
                          <p className="font-medium text-gray-900">{comp.name}</p>
                          <p className="text-xs text-gray-500">{comp.distance} mi away</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{comp.rating}</span>
                        <span className="text-gray-400">({comp.reviewCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
                {!isSectionUnlocked("competitive") && (
                  <p className="text-sm text-purple-700 text-center mt-4">
                    + {report.competitors.length - 5} more competitors with detailed comparison
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Plan - Show when unlocked */}
        {isEverythingUnlocked ? (
          <Card className="border-2 border-green-500">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-purple-600" />
                Complete Action Plan
                <Badge className="bg-green-500">
                  <Unlock className="w-3 h-3 mr-1" />
                  Unlocked
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {report.actionPlan.map((item, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge className={PRIORITY_COLORS[item.priority].bg + ' ' + PRIORITY_COLORS[item.priority].text}>
                        {item.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {EFFORT_LABELS[item.effort]}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{item.action}</p>
                      <p className="text-sm text-gray-600 mb-2">{item.impact}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {item.timeline}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-purple-600" />
                Prioritized Action Plan (Preview)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {report.actionPlan.slice(0, 2).map((item, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge className={PRIORITY_COLORS[item.priority].bg + ' ' + PRIORITY_COLORS[item.priority].text}>
                        {item.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {EFFORT_LABELS[item.effort]}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{item.action}</p>
                      <p className="text-sm text-gray-600 mb-2">{item.impact}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {item.timeline}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Blurred locked items */}
              <div className="mt-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10 flex items-end justify-center pb-8">
                  <Button
                    onClick={() => handleUnlockSection("all")}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Unlock Full Action Plan ({report.actionPlan.length - 2} More Items)
                  </Button>
                </div>
                <div className="blur-sm opacity-50 space-y-3">
                  <div className="h-24 bg-gray-200 rounded-lg"></div>
                  <div className="h-24 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Final CTA - Only show if not everything unlocked */}
        {!isEverythingUnlocked && (
          <Card className="border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Ready for the Complete 40-Point Audit?
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get instant access to all metrics, full competitor analysis, and {report.actionPlan.length} prioritized action items.
                </p>
              </div>
              
              <Button
                onClick={() => handleUnlockSection("all")}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
              >
                <Mail className="w-5 h-5 mr-2" />
                Unlock Complete Report
              </Button>

              <p className="text-sm text-gray-500">
                ✉️ Delivered to your inbox in 60 seconds • No credit card required
              </p>
            </CardContent>
          </Card>
        )}

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
