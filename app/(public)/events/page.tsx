import { promises as fs } from "fs"
import path from "path"
import { Suspense } from "react"
import type { Metadata } from "next"
import { EventsFilter } from "@/components/events/events-filter"
import { EventsList } from "@/components/events/events-list"
import { CityWeather } from "@/components/events/city-weather"
import type { Event, EventCity, EventType, EventPeriod } from "@/lib/types/content"

export const metadata: Metadata = {
  title: "Événements",
  description: "Meetups, webinars et workshops GenAI. Rejoins la communauté GAB.",
}

const VALID_CITIES: EventCity[] = ["Lille", "Paris", "Lyon", "Remote"]
const VALID_TYPES: EventType[] = ["meetup", "webinar", "workshop", "conference"]
const VALID_PERIODS: EventPeriod[] = ["upcoming", "past", "all"]

interface SearchParams {
  city?: string
  type?: string
  period?: string
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const filePath = path.join(process.cwd(), "data", "events.json")
  const raw = await fs.readFile(filePath, "utf-8")
  const events: Event[] = JSON.parse(raw)

  const initialPeriod: EventPeriod = VALID_PERIODS.includes(params.period as EventPeriod)
    ? (params.period as EventPeriod)
    : "upcoming"

  const initialCity: EventCity | "all" = VALID_CITIES.includes(params.city as EventCity)
    ? (params.city as EventCity)
    : "all"

  const initialType: EventType | "all" = VALID_TYPES.includes(params.type as EventType)
    ? (params.type as EventType)
    : "all"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-10">
        <h1 className="font-heading text-3xl font-bold mb-4">Événements</h1>
        <p className="text-lg text-muted-foreground">
          Meetups, webinars et workshops avec des experts GenAI. Participe en direct ou
          regarde les replays.
        </p>
      </div>

      <CityWeather />

      <Suspense>
        <EventsFilter
          initialPeriod={initialPeriod}
          initialCity={initialCity}
          initialType={initialType}
        />
      </Suspense>

      <Suspense>
        <EventsList
          events={events}
          initialPeriod={initialPeriod}
          initialCity={initialCity}
          initialType={initialType}
        />
      </Suspense>
    </div>
  )
}
