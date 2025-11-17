import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const grade = "B+";
  const score = 82;
  const ranking = 3;
  const totalHotels = 15;
  const percentile = 20;

  const competitors = formData.competitors || [];
  const targetHotel = formData.targetHotel;
  
  const hotelCenter = targetHotel 
    ? { lat: targetHotel.lat, lng: targetHotel.lng }
    : { lat: 33.6415, lng: -117.9187 };

  // ... keep existing code (categories array)
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
        metrics: ["Profile completeness: 95%", "Weekly posts: 3-4 times", "Response rate: 98%", "Photos updated: Monthly"],
        actionItems: ["Add virtual tour feature", "Enable messaging for instant booking", "Create special offers section"],
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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT PANEL */}
        <div className="lg:w-[40%] bg-muted/30 p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo-icon.svg" alt="HotelGrader" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">HotelGrader</span>
            </div>
            
            <div className="flex items-start gap-6 mb-6">
              <GradeBadge grade={grade} score={score} size="md" />
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {formData.hotelName}
                </h1>
                <p className="text-muted-foreground mb-3">
                  {formData.city}, {formData.state}
                </p>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-foreground">Rank #{ranking} of {totalHotels}</p>
                  <p className="text-sm text-muted-foreground">Top {percentile}% in your market</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">Quick Insights</h2>
            <div className="space-y-3">
              <QuickInsight title="✓ Your Strengths" variant="success" items={["Google Business Profile: Leading market", "Direct Booking: Strong performance"]} />
              <QuickInsight title="⚠️ Opportunity Gaps" variant="warning" items={["Social Media: Below average", "Website Speed: Needs optimization"]} />
              <QuickInsight title="📊 Market Position" variant="info" items={[`${totalHotels} hotels analyzed`, "5 points behind #1"]} />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Analyze Another Hotel
            </Button>
            <Button variant="default" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL - Map */}
        <div className="lg:w-[60%] bg-background p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Competitive Landscape</h2>
            <p className="text-sm text-muted-foreground">Your hotel and nearby competitors within 2 miles</p>
          </div>

          <Card className="p-4">
            <div className="rounded-lg overflow-hidden border border-border">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} onLoad={() => setIsScriptLoaded(true)}>
                {isScriptLoaded && (
                  <GoogleMap mapContainerStyle={{ width: "100%", height: "600px" }} center={hotelCenter} zoom={14}>
                    {targetHotel && (
                      <Marker
                        position={{ lat: targetHotel.lat, lng: targetHotel.lng }}
                        icon={{ path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z", fillColor: "#0EA5E9", fillOpacity: 1, strokeWeight: 3, strokeColor: "#ffffff", scale: 2.5 }}
                        title={targetHotel.name}
                      />
                    )}
                    {competitors.map((competitor: any, index: number) => (
                      <Marker
                        key={index}
                        position={{ lat: competitor.lat, lng: competitor.lng }}
                        icon={{ path: window.google.maps.SymbolPath.CIRCLE, fillColor: "#EF4444", fillOpacity: 1, strokeWeight: 2, strokeColor: "#ffffff", scale: 8 }}
                        title={`${competitor.name} - ${competitor.rating}★`}
                      />
                    ))}
                  </GoogleMap>
                )}
              </LoadScript>
              
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0EA5E9] border-2 border-white"></div>
                    <span className="text-sm font-medium">Your Hotel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444] border border-white"></div>
                    <span className="text-sm text-muted-foreground">Competitors ({competitors.length})</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
