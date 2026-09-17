import { useState } from "react"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Select } from "../components/ui/Select.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { Event } from "../services/mockData.ts"

const eventTypeColors: Record<string, string> = {
  pageview: "info",
  purchase: "success",
  signup: "default",
  click: "warning",
  view: "default",
  add_to_cart: "secondary",
}

export default function Events() {
  const { data: events = [], isLoading } = useQueryMock<Event[]>({
    queryKey: ["events"],
  })
  const [typeFilter, setTypeFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const types = Array.from(new Set(events.map((e) => e.type)))

  const filtered = events.filter((e) => {
    const matchesType = !typeFilter || e.type === typeFilter
    const matchesDate = !dateFilter || e.timestamp.startsWith(dateFilter)
    return matchesType && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Events</h1>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select
              value={typeFilter}
              onChange={setTypeFilter}
              options={[{ value: "", label: "All Event Types" }, ...types.map((t) => ({ value: t, label: t }))]}
              placeholder="Filter by type"
              className="max-w-xs"
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading events...</div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((event) => (
                  <tr key={event.id} className="transition-colors hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{event.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant={eventTypeColors[event.type] as never}>{event.type}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{event.user}</p>
                        <p className="text-xs text-muted-foreground">{event.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{event.product ?? "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">No events found</div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
