interface LocationSuggestion {
  name: string;
  country?: string;
  type: "city" | "country" | "region";
}

// Comprehensive list of major cities worldwide
const MAJOR_CITIES = [
  // North America
  { name: "New York", country: "United States", type: "city" as const },
  { name: "Los Angeles", country: "United States", type: "city" as const },
  { name: "Chicago", country: "United States", type: "city" as const },
  { name: "Houston", country: "United States", type: "city" as const },
  { name: "Phoenix", country: "United States", type: "city" as const },
  { name: "Philadelphia", country: "United States", type: "city" as const },
  { name: "San Antonio", country: "United States", type: "city" as const },
  { name: "San Diego", country: "United States", type: "city" as const },
  { name: "Dallas", country: "United States", type: "city" as const },
  { name: "San Jose", country: "United States", type: "city" as const },
  { name: "Austin", country: "United States", type: "city" as const },
  { name: "Jacksonville", country: "United States", type: "city" as const },
  { name: "San Francisco", country: "United States", type: "city" as const },
  { name: "Columbus", country: "United States", type: "city" as const },
  { name: "Indianapolis", country: "United States", type: "city" as const },
  { name: "Fort Worth", country: "United States", type: "city" as const },
  { name: "Charlotte", country: "United States", type: "city" as const },
  { name: "Seattle", country: "United States", type: "city" as const },
  { name: "Denver", country: "United States", type: "city" as const },
  { name: "Washington", country: "United States", type: "city" as const },
  { name: "Boston", country: "United States", type: "city" as const },
  { name: "El Paso", country: "United States", type: "city" as const },
  { name: "Nashville", country: "United States", type: "city" as const },
  { name: "Detroit", country: "United States", type: "city" as const },
  { name: "Oklahoma City", country: "United States", type: "city" as const },
  { name: "Portland", country: "United States", type: "city" as const },
  { name: "Las Vegas", country: "United States", type: "city" as const },
  { name: "Memphis", country: "United States", type: "city" as const },
  { name: "Louisville", country: "United States", type: "city" as const },
  { name: "Baltimore", country: "United States", type: "city" as const },
  { name: "Milwaukee", country: "United States", type: "city" as const },
  { name: "Albuquerque", country: "United States", type: "city" as const },
  { name: "Tucson", country: "United States", type: "city" as const },
  { name: "Fresno", country: "United States", type: "city" as const },
  { name: "Mesa", country: "United States", type: "city" as const },
  { name: "Sacramento", country: "United States", type: "city" as const },
  { name: "Atlanta", country: "United States", type: "city" as const },
  { name: "Kansas City", country: "United States", type: "city" as const },
  { name: "Colorado Springs", country: "United States", type: "city" as const },
  { name: "Miami", country: "United States", type: "city" as const },
  { name: "Raleigh", country: "United States", type: "city" as const },
  { name: "Omaha", country: "United States", type: "city" as const },
  { name: "Long Beach", country: "United States", type: "city" as const },
  { name: "Virginia Beach", country: "United States", type: "city" as const },
  { name: "Oakland", country: "United States", type: "city" as const },
  { name: "Minneapolis", country: "United States", type: "city" as const },
  { name: "Tulsa", country: "United States", type: "city" as const },
  { name: "Tampa", country: "United States", type: "city" as const },
  { name: "Arlington", country: "United States", type: "city" as const },
  { name: "New Orleans", country: "United States", type: "city" as const },

  // Canada
  { name: "Toronto", country: "Canada", type: "city" as const },
  { name: "Montreal", country: "Canada", type: "city" as const },
  { name: "Vancouver", country: "Canada", type: "city" as const },
  { name: "Calgary", country: "Canada", type: "city" as const },
  { name: "Edmonton", country: "Canada", type: "city" as const },
  { name: "Ottawa", country: "Canada", type: "city" as const },
  { name: "Winnipeg", country: "Canada", type: "city" as const },
  { name: "Quebec City", country: "Canada", type: "city" as const },
  { name: "Hamilton", country: "Canada", type: "city" as const },
  { name: "Kitchener", country: "Canada", type: "city" as const },

  // Mexico
  { name: "Mexico City", country: "Mexico", type: "city" as const },
  { name: "Guadalajara", country: "Mexico", type: "city" as const },
  { name: "Monterrey", country: "Mexico", type: "city" as const },
  { name: "Puebla", country: "Mexico", type: "city" as const },
  { name: "Tijuana", country: "Mexico", type: "city" as const },
  { name: "León", country: "Mexico", type: "city" as const },
  { name: "Juárez", country: "Mexico", type: "city" as const },
  { name: "Zapopan", country: "Mexico", type: "city" as const },
  { name: "Nezahualcóyotl", country: "Mexico", type: "city" as const },
  { name: "Chihuahua", country: "Mexico", type: "city" as const },

  // Europe
  { name: "London", country: "United Kingdom", type: "city" as const },
  { name: "Birmingham", country: "United Kingdom", type: "city" as const },
  { name: "Manchester", country: "United Kingdom", type: "city" as const },
  { name: "Glasgow", country: "United Kingdom", type: "city" as const },
  { name: "Liverpool", country: "United Kingdom", type: "city" as const },
  { name: "Edinburgh", country: "United Kingdom", type: "city" as const },
  { name: "Leeds", country: "United Kingdom", type: "city" as const },
  { name: "Sheffield", country: "United Kingdom", type: "city" as const },
  { name: "Bristol", country: "United Kingdom", type: "city" as const },
  { name: "Cardiff", country: "United Kingdom", type: "city" as const },

  { name: "Paris", country: "France", type: "city" as const },
  { name: "Marseille", country: "France", type: "city" as const },
  { name: "Lyon", country: "France", type: "city" as const },
  { name: "Toulouse", country: "France", type: "city" as const },
  { name: "Nice", country: "France", type: "city" as const },
  { name: "Nantes", country: "France", type: "city" as const },
  { name: "Strasbourg", country: "France", type: "city" as const },
  { name: "Montpellier", country: "France", type: "city" as const },
  { name: "Bordeaux", country: "France", type: "city" as const },
  { name: "Lille", country: "France", type: "city" as const },

  { name: "Berlin", country: "Germany", type: "city" as const },
  { name: "Hamburg", country: "Germany", type: "city" as const },
  { name: "Munich", country: "Germany", type: "city" as const },
  { name: "Cologne", country: "Germany", type: "city" as const },
  { name: "Frankfurt", country: "Germany", type: "city" as const },
  { name: "Stuttgart", country: "Germany", type: "city" as const },
  { name: "Düsseldorf", country: "Germany", type: "city" as const },
  { name: "Dortmund", country: "Germany", type: "city" as const },
  { name: "Essen", country: "Germany", type: "city" as const },
  { name: "Leipzig", country: "Germany", type: "city" as const },

  { name: "Madrid", country: "Spain", type: "city" as const },
  { name: "Barcelona", country: "Spain", type: "city" as const },
  { name: "Valencia", country: "Spain", type: "city" as const },
  { name: "Seville", country: "Spain", type: "city" as const },
  { name: "Zaragoza", country: "Spain", type: "city" as const },
  { name: "Málaga", country: "Spain", type: "city" as const },
  { name: "Murcia", country: "Spain", type: "city" as const },
  { name: "Palma", country: "Spain", type: "city" as const },
  { name: "Las Palmas", country: "Spain", type: "city" as const },
  { name: "Bilbao", country: "Spain", type: "city" as const },

  { name: "Rome", country: "Italy", type: "city" as const },
  { name: "Milan", country: "Italy", type: "city" as const },
  { name: "Naples", country: "Italy", type: "city" as const },
  { name: "Turin", country: "Italy", type: "city" as const },
  { name: "Palermo", country: "Italy", type: "city" as const },
  { name: "Genoa", country: "Italy", type: "city" as const },
  { name: "Bologna", country: "Italy", type: "city" as const },
  { name: "Florence", country: "Italy", type: "city" as const },
  { name: "Bari", country: "Italy", type: "city" as const },
  { name: "Catania", country: "Italy", type: "city" as const },

  { name: "Amsterdam", country: "Netherlands", type: "city" as const },
  { name: "Rotterdam", country: "Netherlands", type: "city" as const },
  { name: "The Hague", country: "Netherlands", type: "city" as const },
  { name: "Utrecht", country: "Netherlands", type: "city" as const },
  { name: "Eindhoven", country: "Netherlands", type: "city" as const },
  { name: "Tilburg", country: "Netherlands", type: "city" as const },
  { name: "Groningen", country: "Netherlands", type: "city" as const },
  { name: "Almere", country: "Netherlands", type: "city" as const },
  { name: "Breda", country: "Netherlands", type: "city" as const },
  { name: "Nijmegen", country: "Netherlands", type: "city" as const },

  // Asia
  { name: "Tokyo", country: "Japan", type: "city" as const },
  { name: "Yokohama", country: "Japan", type: "city" as const },
  { name: "Osaka", country: "Japan", type: "city" as const },
  { name: "Nagoya", country: "Japan", type: "city" as const },
  { name: "Sapporo", country: "Japan", type: "city" as const },
  { name: "Fukuoka", country: "Japan", type: "city" as const },
  { name: "Kobe", country: "Japan", type: "city" as const },
  { name: "Kawasaki", country: "Japan", type: "city" as const },
  { name: "Kyoto", country: "Japan", type: "city" as const },
  { name: "Saitama", country: "Japan", type: "city" as const },

  { name: "Shanghai", country: "China", type: "city" as const },
  { name: "Beijing", country: "China", type: "city" as const },
  { name: "Chongqing", country: "China", type: "city" as const },
  { name: "Tianjin", country: "China", type: "city" as const },
  { name: "Guangzhou", country: "China", type: "city" as const },
  { name: "Shenzhen", country: "China", type: "city" as const },
  { name: "Wuhan", country: "China", type: "city" as const },
  { name: "Dongguan", country: "China", type: "city" as const },
  { name: "Chengdu", country: "China", type: "city" as const },
  { name: "Nanjing", country: "China", type: "city" as const },

  { name: "Mumbai", country: "India", type: "city" as const },
  { name: "Delhi", country: "India", type: "city" as const },
  { name: "Bangalore", country: "India", type: "city" as const },
  { name: "Hyderabad", country: "India", type: "city" as const },
  { name: "Ahmedabad", country: "India", type: "city" as const },
  { name: "Chennai", country: "India", type: "city" as const },
  { name: "Kolkata", country: "India", type: "city" as const },
  { name: "Surat", country: "India", type: "city" as const },
  { name: "Pune", country: "India", type: "city" as const },
  { name: "Jaipur", country: "India", type: "city" as const },

  { name: "Seoul", country: "South Korea", type: "city" as const },
  { name: "Busan", country: "South Korea", type: "city" as const },
  { name: "Incheon", country: "South Korea", type: "city" as const },
  { name: "Daegu", country: "South Korea", type: "city" as const },
  { name: "Daejeon", country: "South Korea", type: "city" as const },
  { name: "Gwangju", country: "South Korea", type: "city" as const },
  { name: "Suwon", country: "South Korea", type: "city" as const },
  { name: "Ulsan", country: "South Korea", type: "city" as const },
  { name: "Changwon", country: "South Korea", type: "city" as const },
  { name: "Goyang", country: "South Korea", type: "city" as const },

  // Australia & Oceania
  { name: "Sydney", country: "Australia", type: "city" as const },
  { name: "Melbourne", country: "Australia", type: "city" as const },
  { name: "Brisbane", country: "Australia", type: "city" as const },
  { name: "Perth", country: "Australia", type: "city" as const },
  { name: "Adelaide", country: "Australia", type: "city" as const },
  { name: "Gold Coast", country: "Australia", type: "city" as const },
  { name: "Newcastle", country: "Australia", type: "city" as const },
  { name: "Canberra", country: "Australia", type: "city" as const },
  { name: "Sunshine Coast", country: "Australia", type: "city" as const },
  { name: "Wollongong", country: "Australia", type: "city" as const },

  { name: "Auckland", country: "New Zealand", type: "city" as const },
  { name: "Wellington", country: "New Zealand", type: "city" as const },
  { name: "Christchurch", country: "New Zealand", type: "city" as const },
  { name: "Hamilton", country: "New Zealand", type: "city" as const },
  { name: "Tauranga", country: "New Zealand", type: "city" as const },
  { name: "Napier-Hastings", country: "New Zealand", type: "city" as const },
  { name: "Dunedin", country: "New Zealand", type: "city" as const },
  { name: "Palmerston North", country: "New Zealand", type: "city" as const },
  { name: "Nelson", country: "New Zealand", type: "city" as const },
  { name: "Rotorua", country: "New Zealand", type: "city" as const },

  // South America
  { name: "São Paulo", country: "Brazil", type: "city" as const },
  { name: "Rio de Janeiro", country: "Brazil", type: "city" as const },
  { name: "Brasília", country: "Brazil", type: "city" as const },
  { name: "Salvador", country: "Brazil", type: "city" as const },
  { name: "Fortaleza", country: "Brazil", type: "city" as const },
  { name: "Belo Horizonte", country: "Brazil", type: "city" as const },
  { name: "Manaus", country: "Brazil", type: "city" as const },
  { name: "Curitiba", country: "Brazil", type: "city" as const },
  { name: "Recife", country: "Brazil", type: "city" as const },
  { name: "Porto Alegre", country: "Brazil", type: "city" as const },

  { name: "Buenos Aires", country: "Argentina", type: "city" as const },
  { name: "Córdoba", country: "Argentina", type: "city" as const },
  { name: "Rosario", country: "Argentina", type: "city" as const },
  { name: "Mendoza", country: "Argentina", type: "city" as const },
  { name: "Tucumán", country: "Argentina", type: "city" as const },
  { name: "La Plata", country: "Argentina", type: "city" as const },
  { name: "Mar del Plata", country: "Argentina", type: "city" as const },
  { name: "Salta", country: "Argentina", type: "city" as const },
  { name: "Santa Fe", country: "Argentina", type: "city" as const },
  { name: "San Juan", country: "Argentina", type: "city" as const },

  { name: "Lima", country: "Peru", type: "city" as const },
  { name: "Arequipa", country: "Peru", type: "city" as const },
  { name: "Trujillo", country: "Peru", type: "city" as const },
  { name: "Chiclayo", country: "Peru", type: "city" as const },
  { name: "Piura", country: "Peru", type: "city" as const },
  { name: "Iquitos", country: "Peru", type: "city" as const },
  { name: "Cusco", country: "Peru", type: "city" as const },
  { name: "Chimbote", country: "Peru", type: "city" as const },
  { name: "Huancayo", country: "Peru", type: "city" as const },
  { name: "Tacna", country: "Peru", type: "city" as const },

  { name: "Bogotá", country: "Colombia", type: "city" as const },
  { name: "Medellín", country: "Colombia", type: "city" as const },
  { name: "Cali", country: "Colombia", type: "city" as const },
  { name: "Barranquilla", country: "Colombia", type: "city" as const },
  { name: "Cartagena", country: "Colombia", type: "city" as const },
  { name: "Cúcuta", country: "Colombia", type: "city" as const },
  { name: "Soledad", country: "Colombia", type: "city" as const },
  { name: "Ibagué", country: "Colombia", type: "city" as const },
  { name: "Bucaramanga", country: "Colombia", type: "city" as const },
  { name: "Soacha", country: "Colombia", type: "city" as const },

  { name: "Santiago", country: "Chile", type: "city" as const },
  { name: "Valparaíso", country: "Chile", type: "city" as const },
  { name: "Concepción", country: "Chile", type: "city" as const },
  { name: "La Serena", country: "Chile", type: "city" as const },
  { name: "Antofagasta", country: "Chile", type: "city" as const },
  { name: "Temuco", country: "Chile", type: "city" as const },
  { name: "Rancagua", country: "Chile", type: "city" as const },
  { name: "Talca", country: "Chile", type: "city" as const },
  { name: "Arica", country: "Chile", type: "city" as const },
  { name: "Chillán", country: "Chile", type: "city" as const },

  // Africa
  { name: "Lagos", country: "Nigeria", type: "city" as const },
  { name: "Kano", country: "Nigeria", type: "city" as const },
  { name: "Ibadan", country: "Nigeria", type: "city" as const },
  { name: "Abuja", country: "Nigeria", type: "city" as const },
  { name: "Port Harcourt", country: "Nigeria", type: "city" as const },
  { name: "Benin City", country: "Nigeria", type: "city" as const },
  { name: "Maiduguri", country: "Nigeria", type: "city" as const },
  { name: "Zaria", country: "Nigeria", type: "city" as const },
  { name: "Aba", country: "Nigeria", type: "city" as const },
  { name: "Jos", country: "Nigeria", type: "city" as const },

  { name: "Cairo", country: "Egypt", type: "city" as const },
  { name: "Alexandria", country: "Egypt", type: "city" as const },
  { name: "Giza", country: "Egypt", type: "city" as const },
  { name: "Shubra El-Kheima", country: "Egypt", type: "city" as const },
  { name: "Port Said", country: "Egypt", type: "city" as const },
  { name: "Suez", country: "Egypt", type: "city" as const },
  { name: "Luxor", country: "Egypt", type: "city" as const },
  { name: "Mansoura", country: "Egypt", type: "city" as const },
  { name: "El-Mahalla El-Kubra", country: "Egypt", type: "city" as const },
  { name: "Tanta", country: "Egypt", type: "city" as const },

  { name: "Cape Town", country: "South Africa", type: "city" as const },
  { name: "Johannesburg", country: "South Africa", type: "city" as const },
  { name: "Durban", country: "South Africa", type: "city" as const },
  { name: "Pretoria", country: "South Africa", type: "city" as const },
  { name: "Port Elizabeth", country: "South Africa", type: "city" as const },
  { name: "Pietermaritzburg", country: "South Africa", type: "city" as const },
  { name: "Benoni", country: "South Africa", type: "city" as const },
  { name: "Tembisa", country: "South Africa", type: "city" as const },
  { name: "East London", country: "South Africa", type: "city" as const },
  { name: "Vereeniging", country: "South Africa", type: "city" as const },
];

export async function searchLocations(
  query: string
): Promise<LocationSuggestion[]> {
  if (query.length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const suggestions: LocationSuggestion[] = [];

  // Search cities first
  const matchingCities = MAJOR_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(normalizedQuery) ||
      city.country?.toLowerCase().includes(normalizedQuery)
  ).slice(0, 6);

  suggestions.push(...matchingCities);

  // If we have fewer than 6 suggestions, try to get countries from REST Countries API
  if (suggestions.length < 6) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${query}?fields=name`
      );
      if (response.ok) {
        const countries = await response.json();

        if (Array.isArray(countries)) {
          const countryNames = countries
            .slice(0, 6 - suggestions.length)
            .map((country: any) => ({
              name: country.name?.common || "",
              type: "country" as const,
            }))
            .filter((country: LocationSuggestion) => country.name);

          suggestions.push(...countryNames);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  // Remove duplicates and return
  const uniqueSuggestions = suggestions.filter(
    (suggestion, index, self) =>
      index === self.findIndex((s) => s.name === suggestion.name)
  );

  return uniqueSuggestions.slice(0, 8);
}

export function formatLocationDisplay(suggestion: LocationSuggestion): string {
  if (suggestion.country && suggestion.type === "city") {
    return `${suggestion.name}, ${suggestion.country}`;
  }
  return suggestion.name;
}
