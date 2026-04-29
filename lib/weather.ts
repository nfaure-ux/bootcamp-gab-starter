import type { EventCity } from "@/lib/types/content"

export interface CityWeatherData {
  temp: string
  condition: string
  emoji: string
}

// Source : meteofrance.com — 29/04/2026
export const CITY_WEATHER: Partial<Record<EventCity, CityWeatherData>> = {
  Lille: { temp: "15°C", condition: "Ensoleillé", emoji: "☀️" },
  Paris: { temp: "17°C", condition: "Peu nuageux", emoji: "🌤️" },
  Lyon: { temp: "16°C", condition: "Très nuageux", emoji: "☁️" },
}
