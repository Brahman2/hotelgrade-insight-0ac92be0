import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Navigation, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Competitor {
  name: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  price_level: number;
  distance_miles: number;
  place_id: string;
  address: string;
}

interface TargetHotel {
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
}

interface CompetitorMapProps {
  hotelName: string;
  city: string;
  state: string;
}

// Rating tier configuration
const RATING_TIERS = {
  high: { min: 4.5, color: "#ef4444", label: "High Rated", icon: TrendingUp },
  medium: { min: 4.0, color: "#f59e0b", label: "Competitive", icon: Minus },
  low: { min: 0, color: "#10b981", label: "Lower Rated", icon: TrendingDown },
};

const GOOGLE_MAPS_API_KEY = "AIzaSyB7TPyciCLKNs8Ukp_8q9xEdzYycJa7D3M";

export const CompetitorMap = ({ hotelName, city, state }: CompetitorMapProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [target, setTarget] = useState<TargetHotel | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  const [hoveredCompetitor, setHoveredCompetitor] = useState<Competitor | null>(null);
  const [filters, setFilters] = useState({ high: true, medium: true, low: true });
  const [targetRank, setTargetRank] = useState<number | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const BACKEND_URL = "https://web-production-13e22.up.railway.app";

  // Get rating tier for a competitor
  const getRatingTier = (rating: number): "high" | "medium" | "low" => {
    if (rating >= RATING_TIERS.high.min) return "high";
    if (rating >= RATING_TIERS.medium.min) return "medium";
    return "low";
  };

  // Calculate target hotel rank
  const calculateRank = (targetRating: number, competitorRatings: number[]) => {
    const allRatings = [targetRating, ...competitorRatings].sort((a, b) => b - a);
    return allRatings.indexOf(targetRating) + 1;
  };

  useEffect(() => {
    if (isLoaded) {
      fetchCompetitors();
    }
  }, [hotelName, city, state, isLoaded]);

  const fetchCompetitors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BACKEND_URL}/api/find-competitors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotel_name: hotelName,
          city: city,
          state: state,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch competitors");
      }

      const data = await response.json();

      if (data.success) {
        setTarget(data.target);
        setCompetitors(data.competitors);

        // Calculate rank if target has rating
        if (data.target?.rating) {
          const rank = calculateRank(
            data.target.rating,
            data.competitors.map((c: Competitor) => c.rating),
          );
          setTargetRank(rank);
        }
      } else {
        throw new Error(data.message || "Failed to load competitor data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error fetching competitors:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (tier: "high" | "medium" | "low") => {
    setFilters((prev) => ({ ...prev, [tier]: !prev[tier] }));
  };

  const filteredCompetitors = competitors.filter((c) => {
    const tier = getRatingTier(c.rating);
    return filters[tier];
  });

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "8px",
  };

  const center = target ? { lat: target.lat, lng: target.lng } : { lat: 41.8781, lng: -87.6298 };

  const circleOptions = {
    strokeColor: "#667eea",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#667eea",
    fillOpacity: 0.1,
    radius: 3219,
  };

  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.length === 0) {
    return (
      <Card className="p-8 bg-yellow-50 border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Google Maps API Key Required</h3>
        <p className="text-yellow-700 mb-4">Please add your Google Maps API key to CompetitorMap.tsx</p>
      </Card>
    );
  }

  if (loadError) {
    return (
      <Card className="p-8 bg-red-50 border-red-200">
        <h3 className="font-semibold text-red-800 mb-2">⚠️ Google Maps Failed to Load</h3>
        <p className="text-red-600">Error: {loadError.message}</p>
      </Card>
    );
  }

  if (!isLoaded || loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="ml-4 text-gray-600">{!isLoaded ? "Loading Google Maps..." : "Finding nearby competitors..."}</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 bg-red-50 border-red-200">
        <p className="text-red-600">Error: {error}</p>
        <button onClick={fetchCompetitors} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Retry
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Ranking Summary */}
      {targetRank && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-4 rounded-lg">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  You rank #{targetRank} out of {competitors.length + 1} hotels
                </h3>
                <p className="text-muted-foreground mt-1">
                  {targetRank === 1
                    ? "🎉 You're the top-rated hotel in your area!"
                    : targetRank <= 3
                      ? "Great job! You're in the top 3!"
                      : targetRank <= Math.ceil((competitors.length + 1) / 2)
                        ? "You're in the top half of competitors."
                        : "Room for improvement compared to nearby hotels."}
                </p>
              </div>
            </div>
            {target?.rating && (
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{target.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-muted-foreground">Your Rating</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by Rating:</span>
          </div>
          <div className="flex gap-2">
            {(Object.keys(RATING_TIERS) as Array<keyof typeof RATING_TIERS>).map((tier) => {
              const config = RATING_TIERS[tier];
              const Icon = config.icon;
              const count = competitors.filter((c) => getRatingTier(c.rating) === tier).length;

              return (
                <Button
                  key={tier}
                  size="sm"
                  variant={filters[tier] ? "default" : "outline"}
                  onClick={() => toggleFilter(tier)}
                  className="gap-2"
                  style={filters[tier] ? { backgroundColor: config.color, borderColor: config.color } : {}}
                >
                  <Icon className="w-3 h-3" />
                  {config.label} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Map Container */}
      <Card className="overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {/* 2-mile radius circle */}
          {target && <Circle center={center} options={circleOptions} />}

          {/* Target hotel marker (blue) */}
          {target && (
            <Marker
              position={{ lat: target.lat, lng: target.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: { width: 45, height: 45 } as google.maps.Size,
              }}
              title={target.name}
              label={{
                text: "★",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          )}

          {/* Competitor markers - color-coded by rating */}
          {filteredCompetitors.map((competitor, index) => {
            const tier = getRatingTier(competitor.rating);
            const color = RATING_TIERS[tier].color;

            return (
              <Marker
                key={competitor.place_id || index}
                position={{ lat: competitor.lat, lng: competitor.lng }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: color,
                  fillOpacity: 0.9,
                  strokeColor: "white",
                  strokeWeight: 2,
                  scale: 12,
                }}
                title={competitor.name}
                onClick={() => setSelectedCompetitor(competitor)}
                onMouseOver={() => setHoveredCompetitor(competitor)}
                onMouseOut={() => setHoveredCompetitor(null)}
              />
            );
          })}

          {/* InfoWindow on hover */}
          {hoveredCompetitor && (
            <InfoWindow
              position={{ lat: hoveredCompetitor.lat, lng: hoveredCompetitor.lng }}
              onCloseClick={() => setHoveredCompetitor(null)}
              options={{ pixelOffset: new google.maps.Size(0, -15) }}
            >
              <div className="p-2">
                <h4 className="font-semibold text-sm mb-1">{hoveredCompetitor.name}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hoveredCompetitor.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{hoveredCompetitor.reviews} reviews</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{hoveredCompetitor.distance_miles} mi</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Card>

      {/* Enhanced Legend */}
      <Card className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
              <span className="text-sm text-gray-600">Your Hotel</span>
            </div>
            {(Object.keys(RATING_TIERS) as Array<keyof typeof RATING_TIERS>).map((tier) => {
              const config = RATING_TIERS[tier];
              const count = competitors.filter((c) => getRatingTier(c.rating) === tier).length;

              return (
                <div key={tier} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.color }}></div>
                  <span className="text-sm text-gray-600">
                    {config.label} ({count})
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-sm text-gray-500">
            <MapPin className="inline w-4 h-4 mr-1" />
            Showing {filteredCompetitors.length} of {competitors.length} competitors
          </div>
        </div>
      </Card>

      {/* Selected Competitor Info */}
      {selectedCompetitor && (
        <Card className="p-4 bg-indigo-50 border-indigo-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{selectedCompetitor.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedCompetitor.address}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedCompetitor.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({selectedCompetitor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium">{selectedCompetitor.distance_miles} mi away</span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedCompetitor(null)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </Card>
      )}

      {/* Competitor List */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Nearby Competitors</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredCompetitors.slice(0, 10).map((competitor, index) => {
            const tier = getRatingTier(competitor.rating);
            const config = RATING_TIERS[tier];

            return (
              <div
                key={competitor.place_id || index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: config.color }}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{competitor.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{competitor.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-600">{competitor.distance_miles} mi</span>
                    </div>
                  </div>
                </div>
                <div
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                  }}
                >
                  {config.label}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
