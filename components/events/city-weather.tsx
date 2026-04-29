import { CITY_WEATHER } from "@/lib/weather"

const CITY_STYLES = {
  Lille: { bg: "rgba(20, 83, 45, 0.25)", border: "rgba(134, 239, 172, 0.3)", text: "#86efac" },
  Paris: { bg: "rgba(30, 58, 95, 0.25)", border: "rgba(147, 197, 253, 0.3)", text: "#93c5fd" },
  Lyon: { bg: "rgba(127, 29, 29, 0.25)", border: "rgba(252, 165, 165, 0.3)", text: "#fca5a5" },
} as const

export function CityWeather() {
  const cities = (Object.entries(CITY_WEATHER) as [keyof typeof CITY_WEATHER, (typeof CITY_WEATHER)[keyof typeof CITY_WEATHER]][])
    .filter(([city]) => city in CITY_STYLES)

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {cities.map(([city, weather]) => {
        if (!weather) return null
        const style = CITY_STYLES[city as keyof typeof CITY_STYLES]
        return (
          <div
            key={city}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium border"
            style={{
              backgroundColor: style.bg,
              borderColor: style.border,
              color: style.text,
            }}
          >
            <span className="text-base">{weather.emoji}</span>
            <span className="font-semibold">{city}</span>
            <span className="opacity-80">{weather.temp}</span>
            <span className="opacity-60">·</span>
            <span className="opacity-70">{weather.condition}</span>
          </div>
        )
      })}
    </div>
  )
}
