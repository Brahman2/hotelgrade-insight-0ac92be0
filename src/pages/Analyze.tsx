import ExecutiveSummary from "@/components/ExecutiveSummary";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
import MetricCard from "@/components/audit/MetricCard";
import { EmailCaptureModal } from "@/components/audit/EmailCaptureModal";
import { CompetitorMap } from "@/components/CompetitorMap";
import { ProgressSection } from "@/components/ProgressSection";
import { MOCK_AUDIT_REPORT } from "@/lib/mockData";
import type { AuditReport } from "@/types/audit";
import {
  Lock,
  Unlock,
  Mail,
  TrendingUp,
  Star,
  Globe,
  Hotel,
  Share2,
  Target,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";

const Analyze = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || { hotelName: "Grand Plaza Hotel", city: "Chicago", state: "Illinois" };

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [unlockedSections, setUnlockedSections] = useState<string[]>([]);
  const [isAllUnlocked, setIsAllUnlocked] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [competitorCount, setCompetitorCount] = useState(0);

  // Use mock data (in production, this would come from API)
  const auditData: AuditReport = {
    ...MOCK_AUDIT_REPORT,
    hotelName: formData.hotelName,
    city: formData.city,
    state: formData.state,
  };

  // Simulate analysis completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalysisComplete(true);
      setCompetitorCount(15);
    }, 8000); // 8 seconds to match 6-step progress

    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = async (email: string) => {
    setUserEmail(email);
    setIsAllUnlocked(true);
    setUnlockedSections(["google_business", "reviews", "website", "ota", "social", "competitive"]);
    setShowEmailModal(false);
  };

  const sectionIcons = {
    google_business: Globe,
    reviews: Star,
    website: Globe,
    ota: Hotel,
    social: Share2,
    competitive: Target,
  };

  const sections = [
    {
      id: "google_business",
      title: "Digital Presence",
      description: "Your Google presence and local search visibility",
      data: auditData.digitalPresence,
    },
    {
      id: "reviews",
      title: "Reputation",
      description: "Review performance across all major platforms",
      data: auditData.reputation,
    },
    {
      id: "website",
      title: "Social Media",
      description: "Social media presence and engagement metrics",
      data: auditData.socialMedia,
    },
    {
      id: "ota",
      title: "Advertising",
      description: "Advertising and paid marketing presence",
      data: auditData.advertising,
    },
    {
      id: "social",
      title: "Booking",
      description: "Online booking channels and optimization",
      data: auditData.booking,
    },
    {
      id: "competitive",
      title: "Competitive Analysis",
      description: "Market position and competitor insights",
      data: auditData.competitive,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header - matches Index.tsx */}
      <header className="bg-background/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="HotelGrader" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">HotelGrader</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section - matches Index.tsx style */}
      <section className="pt-12 pb-8 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Performance Audit Results</h1>
            <p className="text-xl text-muted-foreground">{auditData.hotelName}</p>
            <p className="text-muted-foreground">
              {auditData.city}, {auditData.state}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Progress Section - shows until analysis complete */}
        <div className="mb-8">
          <ProgressSection isComplete={analysisComplete} competitorCount={competitorCount} />
        </div>

        {/* Competitor Map - always visible, loads after progress */}
        <div className="mb-8">
          <Card className="overflow-hidden border border-border shadow-lg">
            <div className="bg-muted/30 p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Competitive Landscape</h2>
                  <p className="text-muted-foreground mt-1">Your hotel and nearby competitors within 2 miles</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {analysisComplete ? (
                <CompetitorMap hotelName={auditData.hotelName} city={auditData.city} state={auditData.state} />
              ) : (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading competitor map...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Overall Score - shows after analysis complete */}
        {analysisComplete && (
          <div className="mb-8 animate-fade-in">
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 shadow-xl border-0">
              <div className="text-center">
                <p className="text-primary-foreground/80 text-sm font-medium mb-4">OVERALL PERFORMANCE SCORE</p>
                <div className="flex justify-center mb-4">
                  <ScoreGauge
                    grade={auditData.executiveSummary.overallGrade}
                    score={auditData.executiveSummary.overallScore}
                    size="xl"
                  />
                </div>
              </div>
            </Card>
            {/* NEW: Executive Summary - Add this section */}
            <ExecutiveSummary
              overallScore={MOCK_AUDIT_REPORT.executiveSummary.overallScore}
              overallGrade={MOCK_AUDIT_REPORT.executiveSummary.overallGrade}
              competitiveRank={MOCK_AUDIT_REPORT.executiveSummary.competitiveRank}
              competitiveTotal={MOCK_AUDIT_REPORT.executiveSummary.competitiveTotal}
              strengths={MOCK_AUDIT_REPORT.executiveSummary.strengths}
              criticalIssues={MOCK_AUDIT_REPORT.executiveSummary.criticalIssues}
              quickWins={MOCK_AUDIT_REPORT.executiveSummary.quickWins}
              keyFinding={MOCK_AUDIT_REPORT.executiveSummary.keyFinding}
            />

            {/* Rest of your sections... */}
          </div>
        )}

        {/* Unlock All CTA - shows after analysis complete */}
        {analysisComplete && !isAllUnlocked && (
          <Card className="mb-8 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground p-6 shadow-lg border-0 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Unlock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Unlock Your Complete Analysis</h3>
                  <p className="text-primary-foreground/80">
                    Get instant access to all {sections.length} sections with detailed insights
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowEmailModal(true)}
                className="bg-white text-primary hover:bg-white/90 shadow-lg whitespace-nowrap"
              >
                <Mail className="w-4 h-4 mr-2" />
                Unlock All Sections
              </Button>
            </div>
          </Card>
        )}

        {/* Section Cards - show after analysis complete */}
        {analysisComplete && (
          <div className="space-y-8 animate-fade-in">
            {sections.map((section) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
              const isUnlocked = isAllUnlocked || unlockedSections.includes(section.id);
              const showPreview = !isUnlocked;

              return (
                <Card key={section.id} className="overflow-hidden border border-border shadow-lg">
                  {/* Section Header */}
                  <div className="bg-muted/30 p-6 border-b border-border">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                          <p className="text-muted-foreground mt-1">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ScoreGauge
                          grade={
                            section.data.score >= 90
                              ? "A"
                              : section.data.score >= 80
                                ? "B"
                                : section.data.score >= 70
                                  ? "C"
                                  : "D"
                          }
                          score={section.data.score || 0}
                          size="sm"
                        />
                        {isUnlocked ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Unlocked
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-6">
                    {/* Preview (first 2-3 metrics) */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {section.data.metrics.slice(0, showPreview ? 3 : undefined).map((metric, idx) => (
                        <MetricCard
                          key={idx}
                          metric={{
                            ...metric,
                            isLocked: showPreview && idx >= 2,
                          }}
                          onUnlockClick={() => setShowEmailModal(true)}
                        />
                      ))}
                    </div>

                    {/* Locked Overlay / Unlock Button */}
                    {showPreview && (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10 -mt-20"></div>
                        <div className="relative z-20 pt-8 text-center">
                          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 inline-block border border-border shadow-lg">
                            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                              {section.data.metrics.length - 3} More Insights Locked
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              Unlock to see detailed analysis and recommendations
                            </p>
                            <Button onClick={() => setShowEmailModal(true)} className="bg-primary hover:bg-primary/90">
                              <Mail className="w-4 h-4 mr-2" />
                              Unlock This Section
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Full Content (when unlocked) */}
                    {isUnlocked && (
                      <div className="space-y-6 mt-6">
                        {/* Key Findings */}
                        <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            Key Findings
                          </h3>
                          <ul className="space-y-2">
                            {section.data.metrics
                              .filter((m) => m.insight)
                              .map((metric, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                  <span className="text-foreground">{metric.insight}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Priority Actions
                          </h3>
                          <ul className="space-y-2">
                            {section.data.metrics
                              .filter((m) => m.recommendation)
                              .map((metric, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                  <span className="text-foreground">{metric.recommendation}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Final CTA - shows after all sections */}
        {analysisComplete && !isAllUnlocked && (
          <Card className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 shadow-xl border-0 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready for Your Complete Analysis?</h2>
              <p className="text-xl text-primary-foreground/80 mb-6">
                Unlock all {sections.length} sections and get your full 40-point performance audit
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowEmailModal(true)}
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get My Full Report
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
        section="all"
        hotelName={auditData.hotelName}
      />
    </div>
  );
};

export default Analyze;
