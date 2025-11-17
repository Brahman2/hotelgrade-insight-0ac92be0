import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
import { MetricCard } from "@/components/audit/MetricCard";
import { EmailCaptureModal } from "@/components/audit/EmailCaptureModal";
import { CompetitorMap } from "@/components/CompetitorMap";
import { ProgressSection } from "@/components/ProgressSection";
import { mockAuditData } from "@/lib/mockData";
import {
  Lock,
  Unlock,
  Mail,
  Star,
  Globe,
  Hotel,
  Share2,
  Target,
  CheckCircle,
} from "lucide-react";

type TeaserSection = "google_business" | "reviews" | "website" | "ota" | "social" | "competitive";

export const ResultsTeaserFullInteractive = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<TeaserSection | "all">("all");
  const [unlockedSections, setUnlockedSections] = useState<TeaserSection[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [competitorCount, setCompetitorCount] = useState(0);

  // Use mock data
  const auditData = mockAuditData;

  // Simulate map loading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
      setCompetitorCount(15);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = async (email: string) => {
    setUserEmail(email);
    
    if (currentSection === "all") {
      setUnlockedSections([
        "google_business",
        "reviews",
        "website",
        "ota",
        "social",
        "competitive",
      ]);
    } else {
      setUnlockedSections(prev => [...prev, currentSection]);
    }
    
    setShowEmailModal(false);
  };

  const handleUnlockClick = (sectionId: TeaserSection | "all") => {
    setCurrentSection(sectionId);
    setShowEmailModal(true);
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
      title: "Google Business Profile",
      description: "Your Google presence and local search visibility",
      data: auditData.googleBusiness,
    },
    {
      id: "reviews",
      title: "Online Reviews",
      description: "Review performance across all major platforms",
      data: auditData.reviews,
    },
    {
      id: "website",
      title: "Website Performance",
      description: "Technical performance and user experience analysis",
      data: auditData.website,
    },
    {
      id: "ota",
      title: "OTA Presence",
      description: "Online Travel Agency rankings and optimization",
      data: auditData.ota,
    },
    {
      id: "social",
      title: "Social Media",
      description: "Social media presence and engagement metrics",
      data: auditData.social,
    },
    {
      id: "competitive",
      title: "Competitive Analysis",
      description: "Market position and competitor insights",
      data: auditData.competitive,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT PANEL */}
        <div className="lg:w-[40%] bg-muted/30 p-6 lg:p-8 overflow-y-auto">
          {/* Top Banner - Hotel Info & Grade */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo-icon.svg" alt="HotelGrader" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">HotelGrader</span>
            </div>
            
            <Card className="p-6 bg-background/50 border-2">
              <div className="flex items-start gap-6">
                <ScoreGauge grade={auditData.overallGrade} score={auditData.overallScore} size="md" />
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {auditData.hotelInfo.name}
                  </h1>
                  <p className="text-muted-foreground mb-3">
                    {auditData.hotelInfo.city}, {auditData.hotelInfo.state}
                  </p>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">Overall Performance</p>
                    <p className="text-sm text-muted-foreground">{auditData.overallScore}/100 points</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Separator className="my-6" />

          {/* Progress Section */}
          <div className="mb-6">
            <ProgressSection 
              isComplete={mapLoaded} 
              competitorCount={competitorCount}
            />
          </div>

          <Separator className="my-6" />

          {/* Unlock All CTA */}
          {unlockedSections.length < sections.length && (
            <Card className="mb-6 bg-primary text-primary-foreground p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-foreground/20 p-3 rounded-lg">
                    <Unlock className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      Unlock Your Complete Analysis
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Get instant access to all {sections.length} sections with detailed insights
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => handleUnlockClick("all")}
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Unlock All Sections
                </Button>
              </div>
            </Card>
          )}

          {/* Section Cards */}
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
              const isUnlocked = unlockedSections.includes(section.id as TeaserSection);
              const showPreview = !isUnlocked;

              return (
                <Card key={section.id} className="overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-muted/50 p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {section.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ScoreGauge 
                          grade={section.data.score >= 80 ? 'A' : section.data.score >= 70 ? 'B+' : section.data.score >= 60 ? 'B' : section.data.score >= 50 ? 'C' : 'D'} 
                          score={section.data.score} 
                          size="sm" 
                        />
                        {isUnlocked ? (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Unlocked
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-4">
                    {/* Preview (first 2 metrics) */}
                    <div className="grid gap-3 mb-4">
                      {section.data.metrics
                        .slice(0, showPreview ? 2 : undefined)
                        .map((metric, idx) => (
                          <MetricCard
                            key={idx}
                            metric={metric}
                          />
                        ))}
                    </div>

                    {/* Locked Overlay / Unlock Button */}
                    {showPreview && (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10 -mt-12"></div>
                        <div className="relative z-20 pt-8 text-center">
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 inline-block border">
                            <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
                            <h4 className="font-bold mb-2">
                              {section.data.metrics.length - 2} More Insights Locked
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Unlock to see detailed analysis
                            </p>
                            <Button
                              onClick={() => handleUnlockClick(section.id as TeaserSection)}
                              size="sm"
                            >
                              <Mail className="w-3 h-3 mr-2" />
                              Unlock Section
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Full Content (when unlocked) */}
                    {isUnlocked && (
                      <div className="space-y-3">
                        {section.data.metrics.slice(2).map((metric, idx) => (
                          <MetricCard key={idx + 2} metric={metric} />
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL - Map */}
        <div className="lg:w-[60%] bg-background p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Competitive Landscape</h2>
            <p className="text-sm text-muted-foreground">Your hotel and nearby competitors within 2 miles</p>
          </div>

          <Card className="overflow-hidden">
            <div className="rounded-lg border border-border">
              {mapLoaded ? (
                <CompetitorMap
                  hotelName={auditData.hotelInfo.name}
                  city={auditData.hotelInfo.city}
                  state={auditData.hotelInfo.state}
                />
              ) : (
                <div className="flex items-center justify-center py-40">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading competitor map...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
        section="all"
        hotelName={auditData.hotelInfo.name}
      />
    </div>
  );
};

export default ResultsTeaserFullInteractive;
