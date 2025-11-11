import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GradeBadge } from "@/components/GradeBadge";
import { QuickInsight } from "@/components/QuickInsight";
import { CategoryCard } from "@/components/CategoryCard";
import { UpgradeCard } from "@/components/UpgradeCard";
import {
  Star,
  MessageSquare,
  Globe,
  Search,
  Building2,
  Camera,
  TrendingUp,
  Share2,
  Calendar,
  Target,
  Download,
  RotateCcw,
} from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as any;
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  if (!formData) {
    navigate("/");
    return null;
  }

  // Mock data (replace with actual analysis results)
  const grade = "B+";
  const score = 82;
  const ranking = 3;
  const totalHotels = 15;
  const percentile = 20;

  const competitors = formData.competitors || [];
  const targetHotel = formData.targetHotel;
  
  // Use target hotel location if available, otherwise use default
  const hotelCenter = targetHotel 
    ? { lat: targetHotel.lat, lng: targetHotel.lng }
    : { lat: 33.6415, lng: -117.9187 };

  const categories = [
    {
      icon: Star,
      name: "Google Business Profile",
      score: 88,
      status: "Leading" as const,
      marketAverage: 72,
      topCompetitor: 85,
      keyFinding: "Strong profile with regular updates and high engagement",
      details: {
        metrics: [
          "Profile completeness: 95%",
          "Weekly posts: 3-4 times",
          "Response rate: 98%",
          "Photos updated: Monthly",
        ],
        actionItems: [
          "Add virtual tour feature",
          "Enable messaging for instant booking",
          "Create special offers section",
        ],
      },
    },
    {
      icon: MessageSquare,
      name: "Online Reviews",
      score: 76,
      status: "Competitive" as const,
      marketAverage: 74,
      topCompetitor: 89,
      keyFinding: "Good volume but response time could improve",
      details: {
        metrics: [
          "Average rating: 4.2 stars",
          "Total reviews: 342",
          "Response rate: 65%",
          "Recent trend: Stable",
        ],
        actionItems: [
          "Respond to all reviews within 24 hours",
          "Implement review request system",
          "Address common complaints about check-in",
        ],
      },
    },
    {
      icon: Globe,
      name: "Website Performance",
      score: 65,
      status: "Lagging" as const,
      marketAverage: 78,
      topCompetitor: 92,
      keyFinding: "Slow load times affecting user experience",
      details: {
        metrics: [
          "Load time: 4.2 seconds (slow)",
          "Mobile score: 58/100",
          "Bounce rate: 47%",
          "Booking conversion: 2.1%",
        ],
        actionItems: [
          "Optimize images and compress files",
          "Implement CDN for faster delivery",
          "Redesign booking flow for mobile",
        ],
      },
    },
    {
      icon: Search,
      name: "Search Visibility",
      score: 81,
      status: "Leading" as const,
      marketAverage: 68,
      topCompetitor: 79,
      keyFinding: "Ranking well for key local searches",
      details: {
        metrics: [
          "Local pack ranking: #2",
          "Organic keywords: 156",
          "Branded search volume: High",
          "Citation score: 87%",
        ],
        actionItems: [
          "Target long-tail keywords",
          "Build more local backlinks",
          "Update GMB categories",
        ],
      },
    },
    {
      icon: Building2,
      name: "OTA Presence",
      score: 79,
      status: "Competitive" as const,
      marketAverage: 76,
      topCompetitor: 86,
      keyFinding: "Active on major platforms but pricing could be optimized",
      details: {
        metrics: [
          "Platforms: 6 active listings",
          "Booking.com score: 8.4",
          "Expedia rating: 4.3/5",
          "Commission rate: 18% avg",
        ],
        actionItems: [
          "Implement dynamic pricing",
          "Improve OTA photos quality",
          "Add limited-time offers",
        ],
      },
    },
    {
      icon: Camera,
      name: "Photo & Media Quality",
      score: 72,
      status: "Competitive" as const,
      marketAverage: 70,
      topCompetitor: 88,
      keyFinding: "Good coverage but photos need refresh",
      details: {
        metrics: [
          "Total photos: 84",
          "Professional shots: 35%",
          "Last update: 6 months ago",
          "Video content: None",
        ],
        actionItems: [
          "Hire professional photographer",
          "Add virtual tour video",
          "Update seasonal photos quarterly",
        ],
      },
    },
    {
      icon: TrendingUp,
      name: "Metasearch Visibility",
      score: 68,
      status: "Lagging" as const,
      marketAverage: 72,
      topCompetitor: 84,
      keyFinding: "Limited presence on price comparison sites",
      details: {
        metrics: [
          "Google Hotel Ads: Active",
          "Trivago rank: #8 locally",
          "Kayak visibility: Low",
          "Rate parity issues: 3 found",
        ],
        actionItems: [
          "Fix rate parity violations",
          "Expand metasearch coverage",
          "Optimize bidding strategy",
        ],
      },
    },
    {
      icon: Share2,
      name: "Social Media Engagement",
      score: 58,
      status: "Lagging" as const,
      marketAverage: 71,
      topCompetitor: 82,
      keyFinding: "Inactive accounts missing engagement opportunities",
      details: {
        metrics: [
          "Instagram followers: 1,200",
          "Facebook page likes: 3,400",
          "Posting frequency: Monthly",
          "Engagement rate: 1.2%",
        ],
        actionItems: [
          "Post 3-4 times weekly",
          "Run local contests and giveaways",
          "Share user-generated content",
        ],
      },
    },
    {
      icon: Calendar,
      name: "Direct Booking Capability",
      score: 84,
      status: "Leading" as const,
      marketAverage: 66,
      topCompetitor: 80,
      keyFinding: "Strong booking engine with competitive rates",
      details: {
        metrics: [
          "Direct booking rate: 42%",
          "Mobile booking: 58%",
          "Abandonment rate: 22%",
          "Avg. booking value: $245",
        ],
        actionItems: [
          "Add loyalty program integration",
          "Create member-exclusive rates",
          "Implement retargeting campaigns",
        ],
      },
    },
    {
      icon: Target,
      name: "Competitive Positioning",
      score: 77,
      status: "Competitive" as const,
      marketAverage: 75,
      topCompetitor: 85,
      keyFinding: "Well-positioned but room for differentiation",
      details: {
        metrics: [
          "Market share: 12%",
          "Price index: 103 (slightly above avg)",
          "Unique selling points: 3 identified",
          "Brand awareness: Medium-high",
        ],
        actionItems: [
          "Develop signature amenity or service",
          "Create content marketing strategy",
          "Partner with local attractions",
        ],
      },
    },
  ];

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo-icon.svg" alt="HotelGrader" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">HotelGrader</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{formData.hotelName}</h1>
            <p className="text-lg text-muted-foreground">
              {formData.city}, {formData.state}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <GradeBadge grade={grade} score={score} />
            <div className="text-center space-y-1">
              <p className="text-xl font-semibold text-foreground">
                You rank #{ranking} out of {totalHotels} hotels within 2 miles
              </p>
              <p className="text-lg text-muted-foreground">Top {percentile}% in your market</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Quick Insights */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Quick Insights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <QuickInsight
              title="✓ Your Strengths"
              variant="success"
              items={["Google Business Profile: Leading market", "Direct Booking: Strong performance"]}
            />
            <QuickInsight
              title="⚠️ Opportunity Gaps"
              variant="warning"
              items={["Social Media: Below average engagement", "Website Speed: Needs optimization"]}
            />
            <QuickInsight
              title="📊 Market Position"
              variant="info"
              items={[`Rank #${ranking} of ${totalHotels}`, "5 points behind #1 competitor"]}
            />
          </div>
        </div>

        <Separator />

        {/* Competitor Map */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Competitive Landscape</h2>
            <Button variant="outline">View Detailed Comparison</Button>
          </div>
          <Card className="p-4">
            <div className="rounded-lg overflow-hidden border border-border">
              <LoadScript
                googleMapsApiKey="AIzaSyB7TPyciCLKNs8Ukp_8q9xEdzYycJa7D3M"
                onLoad={() => setIsScriptLoaded(true)}
              >
                {isScriptLoaded && (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={hotelCenter}
                    zoom={14}
                    options={{
                      disableDefaultUI: false,
                      zoomControl: true,
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }],
                        },
                      ],
                    }}
                  >
                    {/* Target Hotel - LARGE BLUE Marker */}
                    {targetHotel && (
                      <Marker
                        position={{ lat: targetHotel.lat, lng: targetHotel.lng }}
                        icon={{
                          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                          fillColor: "#0EA5E9",
                          fillOpacity: 1,
                          strokeWeight: 3,
                          strokeColor: "#ffffff",
                          scale: 2.5,
                        }}
                        title={`${targetHotel.name} (Your Hotel)`}
                      />
                    )}
                    
                    {/* Competitors - SMALL RED Markers */}
                    {competitors.map((competitor: any, index: number) => (
                      <Marker
                        key={index}
                        position={{ lat: competitor.lat, lng: competitor.lng }}
                        icon={{
                          path: google.maps.SymbolPath.CIRCLE,
                          fillColor: "#EF4444",
                          fillOpacity: 0.9,
                          strokeWeight: 2,
                          strokeColor: "#ffffff",
                          scale: 6,
                        }}
                        title={`${competitor.name} - ${competitor.rating.toFixed(1)} ★`}
                      />
                    ))}
                  </GoogleMap>
                )}
              </LoadScript>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Detailed Category Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>

        <Separator />

        {/* Upgrade Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Want to Outperform Your Competition?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <UpgradeCard
              title="Full Detailed Report"
              price="FREE"
              variant="free"
              features={[
                "Email + PDF version",
                "All 10 categories detailed",
                "Competitor comparison data",
                "Custom recommendations",
              ]}
              buttonText="Email Me Full Report"
            />
            <UpgradeCard
              title="Strategy Consultation"
              price="FREE"
              variant="consultation"
              features={[
                "30-minute expert call",
                "Custom action plan",
                "Priority booking",
                "Implementation guidance",
              ]}
              buttonText="Book Free Call"
            />
            <UpgradeCard
              title="Premium Services"
              price="Starting at $199/mo"
              variant="premium"
              features={[
                "Done-for-you optimization",
                "Monthly monitoring & reports",
                "Guaranteed improvement",
                "Dedicated account manager",
              ]}
              buttonText="Learn More"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Analyze Another Hotel
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Report
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Your Grade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
