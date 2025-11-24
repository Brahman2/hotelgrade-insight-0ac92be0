import ExecutiveSummary from "@/components/ExecutiveSummary";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
import MetricCard from "@/components/audit/MetricCard";
import { UnlockBanner } from "@/components/UnlockBanner";
import { EmailCaptureModal } from "@/components/audit/EmailCaptureModal";
import { CompetitorMap } from "@/components/CompetitorMap";
import { ProgressSection } from "@/components/ProgressSection";
import { MOCK_AUDIT_REPORT } from "@/lib/mockData";
import { analyzeHotelMetrics, transformApiResponse, SECTION_INFO } from "@/lib/api";
import type { AuditReport, AuditSection } from "@/types/audit";
import { getGradeFromScore } from "@/types/audit";
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
  Loader2,
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<AuditReport | null>(null);
  const [useRealApi, setUseRealApi] = useState(true); // Toggle for API vs mock

  // Start analysis when progress section completes
  const handleAnalysisComplete = async () => {
    setCompetitorCount(15);

    if (useRealApi) {
      // Call the real API
      setIsAnalyzing(true);
      setAnalysisError(null);

      try {
        console.log("🚀 Starting 40-metric analysis...");
        const response = await analyzeHotelMetrics(
          formData.hotelName,
          formData.city,
          formData.state
        );

        if (response.success && response.data) {
          const transformedData = transformApiResponse(response);
          setAuditData(transformedData);
          console.log("✅ Analysis complete:", transformedData);
        } else {
          throw new Error(response.error || "Analysis failed");
        }
      } catch (error) {
        console.error("❌ Analysis error:", error);
        setAnalysisError(error instanceof Error ? error.message : "Analysis failed");
        // Fall back to mock data on error
        setAuditData({
          ...MOCK_AUDIT_REPORT,
          hotelName: formData.hotelName,
          city: formData.city,
          state: formData.state,
        });
      } finally {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }
    } else {
      // Use mock data
      setAuditData({
        ...MOCK_AUDIT_REPORT,
        hotelName: formData.hotelName,
        city: formData.city,
        state: formData.state,
      });
      setAnalysisComplete(true);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setUserEmail(email);
    setIsAllUnlocked(true);
    setUnlockedSections(["digitalPresence", "reputation", "socialMedia", "advertising", "booking", "competitive"]);
    setShowEmailModal(false);
  };

  const sectionIcons = {
    digitalPresence: Globe,
    reputation: Star,
    socialMedia: Share2,
    advertising: Target,
    booking: Hotel,
    competitive: Target,
  };

  // Build sections from audit data
  const getSections = () => {
    if (!auditData) return [];

    // Get data from categories (new structure) or flat structure (legacy)
    const getData = (key: string): AuditSection | undefined => {
      if (auditData.categories && auditData.categories[key as keyof typeof auditData.categories]) {
        return auditData.categories[key as keyof typeof auditData.categories];
      }
      return auditData[key as keyof AuditReport] as AuditSection | undefined;
    };

    return [
      {
        id: "digitalPresence",
        title: SECTION_INFO.digitalPresence.title,
        description: SECTION_INFO.digitalPresence.description,
        data: getData("digitalPresence") || { score: 0, metrics: [] },
      },
      {
        id: "reputation",
        title: SECTION_INFO.reputation.title,
        description: SECTION_INFO.reputation.description,
        data: getData("reputation") || { score: 0, metrics: [] },
      },
      {
        id: "socialMedia",
        title: SECTION_INFO.socialMedia.title,
        description: SECTION_INFO.socialMedia.description,
        data: getData("socialMedia") || { score: 0, metrics: [] },
      },
      {
        id: "advertising",
        title: SECTION_INFO.advertising.title,
        description: SECTION_INFO.advertising.description,
        data: getData("advertising") || { score: 0, metrics: [] },
      },
      {
        id: "booking",
        title: SECTION_INFO.booking.title,
        description: SECTION_INFO.booking.description,
        data: getData("booking") || { score: 0, metrics: [] },
      },
      {
        id: "competitive",
        title: SECTION_INFO.competitive.title,
        description: SECTION_INFO.competitive.description,
        data: getData("competitive") || { score: 0, metrics: [] },
      },
    ];
  };

  const sections = getSections();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Performance Audit Results</h1>
            <p className="text-xl text-muted-foreground">{formData.hotelName}</p>
            <p className="text-muted-foreground">
              {formData.city}, {formData.state}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <ProgressSection
            isComplete={analysisComplete}
            competitorCount={competitorCount}
            hotelName={formData.hotelName}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>

        {/* Loading State - while API is being called */}
        {isAnalyzing && (
          <Card className="mb-8 p-8">
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analyzing 40 Public Signals...</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Our AI is researching {formData.hotelName}'s digital presence across Google, social media, OTAs, and more.
                This typically takes 30-60 seconds.
              </p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {analysisError && (
          <Card className="mb-8 p-6 border-amber-200 bg-amber-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800">Analysis Notice</h3>
                <p className="text-amber-700 text-sm mt-1">
                  {analysisError}. Showing sample data for demonstration.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Competitor Map */}
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
                <CompetitorMap hotelName={formData.hotelName} city={formData.city} state={formData.state} />
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

        {/* Overall Score */}
        {analysisComplete && auditData && (
          <div className="mb-8 animate-fade-in">
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 shadow-xl border-0">
              <div className="text-center">
                <p className="text-primary-foreground/80 text-sm font-medium mb-4">OVERALL PERFORMANCE SCORE</p>
                <div className="flex justify-center mb-4">
                  <ScoreGauge
                    grade={auditData.overallGrade || auditData.executiveSummary?.overallGrade || "C"}
                    score={auditData.overallScore || auditData.executiveSummary?.overallScore || 0}
                    size="lg"
                  />
                </div>
                <div className="text-6xl font-bold mb-2">
                  {auditData.overallGrade || auditData.executiveSummary?.overallGrade || "C"}
                </div>
                <p className="text-primary-foreground/80">
                  {auditData.overallScore || auditData.executiveSummary?.overallScore || 0}/100 points
                </p>
                {auditData._meta && (
                  <p className="text-primary-foreground/60 text-sm mt-2">
                    {auditData._meta.totalMetrics} metrics analyzed
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Executive Summary */}
        {analysisComplete && auditData?.executiveSummary && (
          <div className="mb-8 animate-fade-in">
            <ExecutiveSummary
              overallScore={auditData.executiveSummary.overallScore}
              overallGrade={auditData.executiveSummary.overallGrade}
              competitiveRank={auditData.executiveSummary.competitiveRank}
              competitiveTotal={auditData.executiveSummary.competitiveTotal}
              strengths={auditData.executiveSummary.strengths}
              criticalIssues={auditData.executiveSummary.criticalIssues}
              quickWins={auditData.executiveSummary.quickWins}
              keyFinding={auditData.executiveSummary.keyFinding}
            />
          </div>
        )}

        {/* Unlock All CTA */}
        {analysisComplete && !isAllUnlocked && (
          <Card className="mb-8 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground p-6 shadow-lg border-0 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Unlock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Unlock Your Complete Analysis</h3>
                  <p className="text-primary-foreground/80">Get instant access to all 6 sections with 40 detailed metrics</p>
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

        {/* Section Cards */}
        {analysisComplete && auditData && (
          <div className="space-y-8 animate-fade-in">
            {sections.map((section) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons] || Globe;
              const isUnlocked = isAllUnlocked || unlockedSections.includes(section.id);
              const sectionScore = section.data?.score || 0;

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
                          grade={getGradeFromScore(sectionScore)}
                          score={sectionScore}
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
                    {/* Metric Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {(section.data?.metrics || []).map((metric, idx) => (
                        <MetricCard
                          key={metric.id || idx}
                          title={metric.name || metric.title || metric.label || "Metric"}
                          score={metric.score}
                          insight={metric.insight}
                          isLocked={!isUnlocked && idx >= 2}
                          recommendation={metric.recommendation}
                          detailedAnalysis={metric.detailedAnalysis}
                          actionSteps={metric.actionSteps}
                          expectedImpact={metric.expectedImpact}
                        />
                      ))}
                    </div>

                    {/* Unlock Banner */}
                    {!isUnlocked && section.data?.metrics && section.data.metrics.length > 2 && (
                      <UnlockBanner
                        sectionTitle={section.title}
                        lockedCount={section.data.metrics.length - 2}
                        onUnlock={() => setShowEmailModal(true)}
                      />
                    )}

                    {/* Full Content (when unlocked) */}
                    {isUnlocked && section.data?.metrics && (
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

        {/* Final CTA */}
        {analysisComplete && !isAllUnlocked && (
          <Card className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 shadow-xl border-0 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready for Your Complete Analysis?</h2>
              <p className="text-xl text-primary-foreground/80 mb-6">
                Unlock all 6 sections and get your full 40-metric performance audit
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
        hotelName={formData.hotelName}
      />
    </div>
  );
};

export default Analyze;
