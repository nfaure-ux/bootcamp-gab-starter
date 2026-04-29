"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import type { EventCity, EventType, EventPeriod } from "@/lib/types/content"

const PERIODS: { value: EventPeriod; label: string }[] = [
  { value: "upcoming", label: "À venir" },
  { value: "past", label: "Passés" },
  { value: "all", label: "Tous" },
]

const CITIES: { value: EventCity | "all"; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "Lille", label: "Lille" },
  { value: "Paris", label: "Paris" },
  { value: "Lyon", label: "Lyon" },
  { value: "Remote", label: "Remote" },
]

const TYPES: { value: EventType | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "meetup", label: "Meetup" },
  { value: "webinar", label: "Webinar" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conférence" },
]

interface EventsFilterProps {
  initialPeriod: EventPeriod
  initialCity: EventCity | "all"
  initialType: EventType | "all"
}

export function EventsFilter({ initialPeriod, initialCity, initialType }: EventsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const period = (searchParams.get("period") as EventPeriod) || initialPeriod
  const city = (searchParams.get("city") as EventCity | "all") || initialCity
  const type = (searchParams.get("type") as EventType | "all") || initialType

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === "all" || value === "upcoming") {
        if (key === "period" && value === "upcoming") {
          params.delete(key)
        } else if (value === "all") {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      } else {
        params.set(key, value)
      }
      const query = params.toString()
      router.replace(query ? `?${query}` : "/events", { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-col gap-3 mb-8">
      <FilterGroup
        label="Période"
        options={PERIODS}
        value={period}
        onChange={(v) => updateFilter("period", v)}
      />
      <FilterGroup
        label="Ville"
        options={CITIES}
        value={city}
        onChange={(v) => updateFilter("city", v)}
      />
      <FilterGroup
        label="Type"
        options={TYPES}
        value={type}
        onChange={(v) => updateFilter("type", v)}
      />
    </div>
  )
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground w-14 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-3 py-1 text-sm rounded-[12px] border transition-colors",
              value === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
