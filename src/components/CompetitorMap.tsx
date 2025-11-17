import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CompetitorMapProps {
  hotelName: string;
  city: string;
  state: string;
}

export function CompetitorMap({ hotelName, city, state }: CompetitorMapProps) {
  const [mapData, setMapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const response = await fetch("https://web-production-13e22.up.railway.app/api/find-competitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hotel_name: hotelName,
            city,
            state,
          }),
        });
        const data = await response.json();
        setMapData(data);
      } catch (error) {
        console.error("Error fetching competitors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitors();
  }, [hotelName, city, state]);

  if (loading || !mapData) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Google Maps API key not configured</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={{ lat: mapData.target.lat, lng: mapData.target.lng }}
        zoom={14}
        mapContainerStyle={{ height: "400px", width: "100%" }}
      >
        <Marker
          position={{ lat: mapData.target.lat, lng: mapData.target.lng }}
          label="📍"
        />
        {mapData.competitors?.map((comp: any, idx: number) => (
          <Marker
            key={idx}
            position={{ lat: comp.lat, lng: comp.lng }}
            label="🏨"
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
