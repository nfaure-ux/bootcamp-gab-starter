"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/events/event-card"
import type { Event, EventCity, EventType, EventPeriod } from "@/lib/types/content"

const VALID_CITIES: EventCity[] = ["Lille", "Paris", "Lyon", "Remote"]
const VALID_TYPES: EventType[] = ["meetup", "webinar", "workshop", "conference"]
const VALID_PERIODS: EventPeriod[] = ["upcoming", "past", "all"]

interface EventsListProps {
  events: Event[]
  initialPeriod: EventPeriod
  initialCity: EventCity | "all"
  initialType: EventType | "all"
}

export function EventsList({ events, initialPeriod, initialCity, initialType }: EventsListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const now = new Date()

  const rawPeriod = searchParams.get("period")
  const rawCity = searchParams.get("city")
  const rawType = searchParams.get("type")

  const period: EventPeriod = VALID_PERIODS.includes(rawPeriod as EventPeriod)
    ? (rawPeriod as EventPeriod)
    : initialPeriod

  const city: EventCity | "all" = VALID_CITIES.includes(rawCity as EventCity)
    ? (rawCity as EventCity)
    : initialCity

  const type: EventType | "all" = VALID_TYPES.includes(rawType as EventType)
    ? (rawType as EventType)
    : initialType

  const filtered = events
    .filter((e) => e.published)
    .filter((e) => {
      const isPast = new Date(e.event_date) < now
      if (period === "upcoming") return !isPast
      if (period === "past") return isPast
      return true
    })
    .filter((e) => city === "all" || e.city === city)
    .filter((e) => type === "all" || e.event_type === type)
    .sort((a, b) => {
      const aDate = new Date(a.event_date).getTime()
      const bDate = new Date(b.event_date).getTime()
      if (period === "past") return bDate - aDate
      if (period === "upcoming") return aDate - bDate
      const aIsPast = new Date(a.event_date) < now
      const bIsPast = new Date(b.event_date) < now
      if (!aIsPast && bIsPast) return -1
      if (aIsPast && !bIsPast) return 1
      return aIsPast ? bDate - aDate : aDate - bDate
    })

  const hasActiveFilters = city !== "all" || type !== "all" || period !== "upcoming"

  if (filtered.length === 0) {
    return (
      <div className="rounded-lg border border-border/50 p-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-6">
          {period === "upcoming" && !hasActiveFilters
            ? "Pas d'événement à venir pour le moment."
            : "Aucun résultat pour ces filtres."}
        </p>
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={() => router.replace("/events", { scroll: false })}
          >
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
