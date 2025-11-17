import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, Circle } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Navigation } from "lucide-react";

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
}

interface CompetitorMapProps {
  hotelName: string;
  city: string;
  state: string;
}

// 🔑 ADD YOUR GOOGLE MAPS API KEY HERE
// Get it from: https://console.cloud.google.com/google/maps-apis
// OR from your Railway environment variables (same key you use there)
const GOOGLE_MAPS_API_KEY = "AIzaSyB7TPyciCLKNs8Ukp_8q9xEdzYycJa7D3M"; // ⬅️ REPLACE THIS

export const CompetitorMap = ({ hotelName, city, state }: CompetitorMapProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [target, setTarget] = useState<TargetHotel | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  // Use the hook to load Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Your Railway backend URL
  const BACKEND_URL = "https://web-production-13e22.up.railway.app";

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

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "8px",
  };

  const center = target ? { lat: target.lat, lng: target.lng } : { lat: 41.8781, lng: -87.6298 }; // Default to Chicago

  const circleOptions = {
    strokeColor: "#667eea",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#667eea",
    fillOpacity: 0.1,
    radius: 3219, // 2 miles in meters
  };

  // Check if API key is configured
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_API_KEY_HERE") {
    return (
      <Card className="p-8 bg-yellow-50 border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Google Maps API Key Required</h3>
        <p className="text-yellow-700 mb-4">Please add your Google Maps API key to CompetitorMap.tsx (line 33)</p>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
          <li>Open CompetitorMap.tsx in Lovable</li>
          <li>
            Find line 33: <code className="bg-yellow-100 px-1">const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY_HERE"</code>
          </li>
          <li>Replace with your actual API key from Railway or Google Cloud Console</li>
          <li>Save and refresh</li>
        </ol>
      </Card>
    );
  }

  // Handle Google Maps loading error
  if (loadError) {
    return (
      <Card className="p-8 bg-red-50 border-red-200">
        <h3 className="font-semibold text-red-800 mb-2">⚠️ Google Maps Failed to Load</h3>
        <p className="text-red-600">Error: {loadError.message}</p>
        <p className="text-sm text-red-600 mt-2">
          Please check your API key and ensure the Maps JavaScript API is enabled in Google Cloud Console.
        </p>
      </Card>
    );
  }

  // Show loading while Google Maps script loads
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
                scaledSize: { width: 40, height: 40 } as google.maps.Size,
              }}
              title={target.name}
            />
          )}

          {/* Competitor markers (red) */}
          {competitors.map((competitor, index) => {
            const size = competitor.rating >= 4.5 ? 40 : competitor.rating >= 4.0 ? 35 : 30;
            return (
              <Marker
                key={competitor.place_id || index}
                position={{ lat: competitor.lat, lng: competitor.lng }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: { width: size, height: size } as google.maps.Size,
                }}
                title={competitor.name}
                onClick={() => setSelectedCompetitor(competitor)}
              />
            );
          })}
        </GoogleMap>
      </Card>

      {/* Map Legend */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Your Hotel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Competitors ({competitors.length})</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <MapPin className="inline w-4 h-4 mr-1" />
            2-mile radius
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
          {competitors.slice(0, 10).map((competitor, index) => (
            <div
              key={competitor.place_id || index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedCompetitor(competitor)}
            >
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
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  competitor.rating >= 4.5
                    ? "bg-red-100 text-red-700"
                    : competitor.rating >= 4.0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {competitor.rating >= 4.5 ? "High Rated" : competitor.rating >= 4.0 ? "Competitive" : "Lower Rated"}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
