import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Hotel, MapPin, Loader2, Search } from "lucide-react";

// API base URL - update for production
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://web-production-13e22.up.railway.app";

interface HotelSuggestion {
  place_id: string;
  name: string;
  description: string;
  secondary_text: string;
}

interface HotelDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  rating?: number;
  reviews?: number;
  place_id: string;
  lat?: number;
  lng?: number;
}

interface HotelAutocompleteProps {
  onSelect: (hotel: HotelDetails) => void;
  placeholder?: string;
  className?: string;
}

export const HotelAutocomplete = ({
  onSelect,
  placeholder = "Start typing your hotel name...",
  className = "",
}: HotelAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<HotelSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Fetch suggestions with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/hotel-autocomplete?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data.success && data.suggestions) {
          setSuggestions(data.suggestions);
          setShowDropdown(data.suggestions.length > 0);
          setSelectedIndex(-1);
        }
      } catch (error) {
        console.error("Autocomplete error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        break;
    }
  };

  // Handle selection
  const handleSelect = async (suggestion: HotelSuggestion) => {
    setQuery(suggestion.name);
    setShowDropdown(false);
    setIsLoading(true);

    try {
      // Fetch full hotel details including city/state
      const response = await fetch(
        `${API_BASE_URL}/api/hotel-details?place_id=${encodeURIComponent(
          suggestion.place_id
        )}`
      );
      const data = await response.json();

      if (data.success && data.hotel) {
        onSelect(data.hotel);
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      // Fallback: use what we have from autocomplete
      onSelect({
        name: suggestion.name,
        address: suggestion.description,
        city: "",
        state: "",
        place_id: suggestion.place_id,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 text-base"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-card rounded-lg shadow-lg border border-border max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-muted flex items-start gap-3 transition-colors ${
                index === selectedIndex ? "bg-primary/10" : ""
              } ${index !== suggestions.length - 1 ? "border-b border-border" : ""}`}
            >
              <Hotel className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-foreground truncate">
                  {suggestion.name}
                </div>
                {suggestion.secondary_text && (
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{suggestion.secondary_text}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showDropdown && query.length >= 2 && suggestions.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-card rounded-lg shadow-lg border border-border px-4 py-3 text-muted-foreground text-sm">
          No hotels found matching "{query}"
        </div>
      )}
    </div>
  );
};

export default HotelAutocomplete;
