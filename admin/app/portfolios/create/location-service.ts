// Real location service using OpenStreetMap Nominatim API
// This is a free geocoding service that doesn't require an API key

export interface LocationResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  name?: string;
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

export async function searchLocations(
  query: string
): Promise<LocationResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      limit: "10",
      addressdetails: "1",
      // Add a unique user agent as required by Nominatim usage policy
      // In production, replace this with your app name and contact
      "accept-language": "en",
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}?${params}`, {
      headers: {
        // Nominatim requires a user agent
        "User-Agent": "ProfileEditor/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LocationResult[] = await response.json();

    // Filter and sort results for better relevance
    return data
      .filter((location) => {
        // Filter out very specific locations (like individual buildings)
        // Keep cities, towns, states, countries
        const relevantTypes = [
          "city",
          "town",
          "village",
          "state",
          "country",
          "municipality",
          "administrative",
          "suburb",
          "neighbourhood",
        ];
        return relevantTypes.some(
          (type) =>
            location.type?.includes(type) || location.class?.includes(type)
        );
      })
      .sort((a, b) => b.importance - a.importance) // Sort by importance
      .slice(0, 8); // Limit to 8 results for better UX
  } catch (error) {
    console.error("Error fetching locations from Nominatim:", error);
    throw error;
  }
}

// Alternative: Using Mapbox Geocoding API (requires API key)
export async function searchLocationsMapbox(
  query: string,
  apiKey: string
): Promise<LocationResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      access_token: apiKey,
      limit: "10",
      types: "place,locality,district,region,country",
    });

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?${params}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform Mapbox response to match our interface
    return data.features.map((feature: any) => ({
      place_id: feature.id,
      display_name: feature.place_name,
      name: feature.text,
      lat: feature.center[1].toString(),
      lon: feature.center[0].toString(),
      type: feature.place_type[0],
      importance: feature.relevance,
    }));
  } catch (error) {
    console.error("Error fetching locations from Mapbox:", error);
    throw error;
  }
}

// Alternative: Using Google Places API (requires API key)
export async function searchLocationsGoogle(
  query: string,
  apiKey: string
): Promise<LocationResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      input: query,
      types: "(cities)",
      key: apiKey,
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform Google response to match our interface
    return data.predictions.map((prediction: any) => ({
      place_id: prediction.place_id,
      display_name: prediction.description,
      name: prediction.structured_formatting.main_text,
      type: "place",
      importance: 1,
    }));
  } catch (error) {
    console.error("Error fetching locations from Google:", error);
    throw error;
  }
}
