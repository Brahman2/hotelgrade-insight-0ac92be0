import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
import { MetricCard } from "@/components/audit/MetricCard";
import { EmailCaptureModal } from "@/components/audit/EmailCaptureModal";
import { CompetitorMap } from "@/components/CompetitorMap";
import { mockAuditData } from "@/lib/mockData";
import {
  Lock,
  Unlock,
  Mail,
  TrendingUp,
  Star,
  Globe,
  Search,
  Hotel,
  Camera,
  Share2,
  ShoppingCart,
  Target,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ResultsTeaser = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [unlockedSections, setUnlockedSections] = useState<string[]>([]);
  const [isAllUnlocked, setIsAllUnlocked] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  // Use mock data
  const auditData = mockAuditData;

  const handleEmailSubmit = async (email: string) => {
    setUserEmail(email);
    
    if (currentSection === "all") {
      setIsAllUnlocked(true);
      setUnlockedSections([
        "google_business",
        "reviews",
        "website",
        "ota",
        "social",
        "competitive",
      ]);
    } else if (currentSection) {
      setUnlockedSections((prev) => [...prev, currentSection]);
    }
    
    setShowEmailModal(false);
    setCurrentSection(null);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Performance Audit Results
            </h1>
            <p className="text-xl text-indigo-100 mb-2">
              {auditData.hotelInfo.name}
            </p>
            <p className="text-indigo-200">
              {auditData.hotelInfo.city}, {auditData.hotelInfo.state}
            </p>
          </div>

          {/* Overall Score */}
          <div className="mt-12 max-w-md mx-auto">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
              <div className="text-center">
                <p className="text-indigo-100 text-sm font-medium mb-4">
                  OVERALL PERFORMANCE SCORE
                </p>
                <div className="flex justify-center mb-4">
                  <ScoreGauge 
                    score={auditData.overallScore} 
                    grade={auditData.overallGrade}
                    size="lg" 
                  />
                </div>
                <div className="text-5xl font-bold mb-2">
                  {auditData.overallGrade}
                </div>
                <p className="text-indigo-100">
                  {auditData.overallScore}/100 points
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Unlock All CTA */}
        {!isAllUnlocked && (
          <Card className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Unlock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Unlock Your Complete Analysis
                  </h3>
                  <p className="text-indigo-100">
                    Get instant access to all {sections.length} sections with detailed insights
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowEmailModal(true)}
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Unlock All Sections
              </Button>
            </div>
          </Card>
        )}

        {/* Section Cards */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
            const isUnlocked = isAllUnlocked || unlockedSections.includes(section.id);
            const showPreview = !isUnlocked;

            return (
              <Card key={section.id} className="overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                        <p className="text-gray-600 mt-1">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScoreGauge 
                        score={section.data.score || 0} 
                        grade="B" 
                        size="sm" 
                      />
                      {isUnlocked ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium flex items-center gap-1">
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
                    {section.data.metrics
                      .slice(0, showPreview ? 3 : undefined)
                      .map((metric, idx) => (
                        <MetricCard
                          key={idx}
                          metric={{
                            ...metric,
                            isLocked: showPreview && idx >= 2
                          }}
                        />
                      ))}
                  </div>

                  {/* Locked Overlay / Unlock Button */}
                  {showPreview && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white z-10 -mt-20"></div>
                      <div className="relative z-20 pt-8 text-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 inline-block">
                          <Lock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">
                            {section.data.metrics.length - 3} More Insights Locked
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Unlock to see detailed analysis and recommendations
                          </p>
                          <Button
                            onClick={() => setShowEmailModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
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
                      {/* Additional unlocked content */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <p className="text-green-800 text-center font-medium">
                          Full section details unlocked! Check your email for the complete analysis.
                        </p>
                      </div>

                      {/* Special: Competitor Map for Competitive Analysis Section */}
                      {section.id === "competitive" && (
                        <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-indigo-600" />
                            Competitor Location Analysis
                          </h3>
                          <CompetitorMap
                            hotelName={auditData.hotelInfo.name}
                            city={auditData.hotelInfo.city}
                            state={auditData.hotelInfo.state}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Final CTA */}
        {!isAllUnlocked && (
          <Card className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready for Your Complete Analysis?
              </h2>
              <p className="text-xl text-indigo-100 mb-6">
                Unlock all {sections.length} sections and get your full 40-point performance audit
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setShowEmailModal(true)}
                className="bg-white text-indigo-600 hover:bg-indigo-50"
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
        onClose={() => {
          setShowEmailModal(false);
          setCurrentSection(null);
        }}
        onSubmit={handleEmailSubmit}
        section={currentSection as any}
        hotelName={auditData.hotelInfo.name}
      />
    </div>
  );
};

export default ResultsTeaser;
