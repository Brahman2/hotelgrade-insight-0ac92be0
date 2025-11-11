import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2, Edit3 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CompetitorData {
  name: string;
  lat: number;
  lng: number;
  rating: number;
}

interface TargetHotel {
  name: string;
  lat: number;
  lng: number;
}

const scanningSteps = [
  "🏨 Finding hotel & competitors",
  "⭐ Checking Google Business Profile",
  "💬 Analyzing reviews across platforms",
  "📸 Counting photos & media",
  "🌐 Testing website speed",
  "📱 Checking mobile experience",
  "🔍 Measuring search visibility",
  "🏢 Scanning OTA presence",
  "📊 Checking metasearch visibility",
  "📈 Analyzing social media",
];

const Analyze = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as { hotelName: string; city: string; state: string };

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [targetHotel, setTargetHotel] = useState<TargetHotel | null>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [apiError, setApiError] = useState<string>("");
  const [hotelCenter, setHotelCenter] = useState({ lat: 0, lng: 0 });
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const hasNavigated = useRef(false);

  console.log('🚀 Analyze component rendered');
  console.log('📋 Form data:', formData);
  console.log('🗺️ isScriptLoaded:', isScriptLoaded);

  useEffect(() => {
    if (!formData) {
      navigate("/");
      return;
    }

    console.log('🚀 Starting hotel analysis...');
    console.log('📍 Hotel:', formData.hotelName, formData.city, formData.state);

    // Fetch competitors from API immediately
    const fetchCompetitors = async () => {
      console.log('📡 Fetching competitors...');
      try {
        setMapLoading(true);
        setApiError("");
        
        const response = await fetch('https://web-production-13e22.up.railway.app/api/find-competitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hotel_name: formData.hotelName,
            city: formData.city,
            state: formData.state,
          }),
        });

        if (!response.ok) {
          throw new Error('Hotel not found or API error');
        }

        const data = await response.json();
        console.log('✅ API Response:', data);
        
        if (data.target && data.target.lat && data.target.lng) {
          const target: TargetHotel = {
            name: data.target.name || formData.hotelName,
            lat: data.target.lat,
            lng: data.target.lng,
          };
          setTargetHotel(target);
          setHotelCenter({ lat: target.lat, lng: target.lng });
        }

        if (data.competitors && Array.isArray(data.competitors)) {
          const apiCompetitors: CompetitorData[] = data.competitors.map((comp: any) => ({
            name: comp.name || 'Unknown Hotel',
            lat: comp.lat,
            lng: comp.lng,
            rating: comp.rating || 0,
          }));
          setCompetitors(apiCompetitors);
        }

        setMapLoading(false);
      } catch (error) {
        console.error("❌ Error fetching competitors:", error);
        setApiError(error instanceof Error ? error.message : "Failed to load hotel data");
        setMapLoading(false);
      }
    };

    fetchCompetitors();

    // Scanning progress animation (3 seconds per step)
    scanningSteps.forEach((_, index) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
      }, index * 3000);
    });

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [formData, navigate]);

  // Separate useEffect to handle navigation when countdown reaches 0
  useEffect(() => {
    if (secondsRemaining === 0 && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/results", {
        state: {
          ...formData,
          competitors,
          targetHotel,
        },
      });
    }
  }, [secondsRemaining, formData, competitors, targetHotel, navigate]);

  if (!formData) return null;

  const handleNotifyMe = () => {
    console.log("Notify:", { phone, email });
    // In production: Send notification request to backend
  };

  const mapContainerStyle = {
    width: "100%",
    height: "450px",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile/Desktop Layout */}
      <div className="flex flex-col lg:flex-row h-screen">
        {/* LEFT PANEL */}
        <div className="lg:w-[40%] bg-muted/30 p-6 lg:p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-icon.svg" alt="HotelGrader" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">HotelGrader</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Analyzing {formData.hotelName}</h1>
            <p className="text-muted-foreground">
              {formData.city}, {formData.state}
            </p>
          </div>

          {/* Scanning Progress */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Analysis in Progress...</h2>
            <div className="space-y-3">
              {scanningSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    completedSteps.includes(index) ? "text-green-600 dark:text-green-500" : "text-muted-foreground"
                  }`}
                >
                  <div className="mt-0.5">
                    {completedSteps.includes(index) ? (
                      <Check className="h-5 w-5 animate-scale-in" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-current" />
                    )}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div>
                <p className="font-semibold text-foreground">Running...</p>
                <p className="text-sm text-muted-foreground">{secondsRemaining} seconds remaining</p>
              </div>
            </div>
          </Card>

          <Separator className="my-6" />

          {/* Bottom Section */}
          <div className="space-y-4">
            <p className="font-semibold text-foreground">Can't wait for results?</p>
            <Input type="tel" placeholder="555-123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input type="email" placeholder="you@hotel.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button onClick={handleNotifyMe} className="w-full">
              Text & Email Me Results
            </Button>
            <p className="text-xs text-muted-foreground text-center">We'll send your report immediately</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-[60%] bg-background p-6 lg:p-8 overflow-y-auto">
          {/* Search Bar */}
          <Card className="p-4 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium">
              {formData.hotelName} in {formData.city}
            </span>
            <Edit3 className="h-4 w-4 text-muted-foreground" />
          </Card>

          {/* Map Section */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Competitive Landscape</h2>

            {apiError ? (
              <div className="w-full h-[450px] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-destructive font-semibold mb-2">Error Loading Map</p>
                  <p className="text-muted-foreground text-sm">{apiError}</p>
                </div>
              </div>
            ) : mapLoading ? (
              <div className="w-full h-[450px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading competitors...</p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border border-border">
                <LoadScript
                  googleMapsApiKey="AIzaSyB7TPyciCLKNs8Ukp_8q9xEdzYycJa7D3M"
                  onLoad={() => {
                    console.log('🗺️ Google Maps script loaded');
                    setIsScriptLoaded(true);
                  }}
                >
                  {isScriptLoaded && (() => {
                    console.log('🗺️ Rendering GoogleMap component');
                    console.log('📍 Map center:', hotelCenter);
                    console.log('🎯 Target hotel for marker:', targetHotel);
                    console.log('🔴 Competitors for markers:', competitors);
                    console.log('📊 Total markers to render:', (targetHotel ? 1 : 0) + competitors.length);
                    return (
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
                        {/* Target Hotel Marker - LARGE BLUE */}
                        {targetHotel && (() => {
                          console.log('🔵 Rendering BLUE target marker at:', targetHotel.lat, targetHotel.lng);
                          return (
                            <Marker
                              position={{ lat: targetHotel.lat, lng: targetHotel.lng }}
                              icon={{
                                path: window.google.maps.SymbolPath.CIRCLE,
                                fillColor: "#0EA5E9",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 2,
                                scale: 15,
                              }}
                              label={{
                                text: "🏨",
                                fontSize: "24px",
                              }}
                              title={`${targetHotel.name} (Your Hotel)`}
                            />
                          );
                        })()}

                        {/* Competitor Markers - SMALL RED */}
                        {competitors.map((competitor, index) => {
                          console.log(`🔴 Rendering RED competitor marker #${index + 1}:`, competitor.name, 'at', competitor.lat, competitor.lng);
                          return (
                            <Marker
                              key={index}
                              position={{ lat: competitor.lat, lng: competitor.lng }}
                              icon={{
                                path: window.google.maps.SymbolPath.CIRCLE,
                                fillColor: "#EF4444",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 1,
                                scale: 8,
                              }}
                              title={`${competitor.name} - ${competitor.rating.toFixed(1)} ★`}
                            />
                          );
                        })}
                      </GoogleMap>
                    );
                  })()}
                </LoadScript>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <Card className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="text-lg">🏨</span> Your Hotel
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔴</span> Competitors
                </span>
              </div>
              <span className="text-muted-foreground">Showing {competitors.length + 1} hotels within 2 miles</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
