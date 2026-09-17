import { useState } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Modal } from "../components/ui/Modal.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Select } from "../components/ui/Select.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import { mockCustomers } from "../services/mockData.ts"
import type { Customer } from "../services/mockData.ts"

export default function Customers() {
  const { data: customers = [], isLoading } = useQueryMock<Customer[]>({
    queryKey: ["customers"],
  })
  const [search, setSearch] = useState("")
  const [segmentFilter, setSegmentFilter] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const segments = Array.from(new Set(mockCustomers.flatMap((c) => c.segments)))

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchesSegment = !segmentFilter || c.segments.includes(segmentFilter)
    return matchesSearch && matchesSegment
  })

  const statusVariant = (status: string) => (status === "active" ? "success" : "warning")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <Button>Add Customer</Button>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={segmentFilter}
              onChange={setSegmentFilter}
              options={[{ value: "", label: "All Segments" }, ...segments.map((s) => ({ value: s, label: s }))]}
              placeholder="Filter by segment"
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading customers...</div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Segments</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">LTV</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="cursor-pointer transition-colors hover:bg-muted/50"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <td className="px-4 py-3 font-medium">{customer.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(customer.status)}>{customer.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {customer.segments.slice(0, 2).map((seg) => (
                          <span key={seg} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                            {seg}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">${customer.lifetimeValue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(customer.lastActive).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">No customers found</div>
            )}
          </div>
        </Card>
      )}

      <Modal
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer?.name ?? "Customer Details"}
        footer={
          <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
            Close
          </Button>
        }
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {selectedCustomer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium">{selectedCustomer.email}</p>
                <p className="text-sm text-muted-foreground">Member since {new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Total Purchases</p>
                <p className="text-lg font-semibold">{selectedCustomer.totalPurchases}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Lifetime Value</p>
                <p className="text-lg font-semibold">${selectedCustomer.lifetimeValue.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCustomer.interests.map((interest) => (
                  <span key={interest} className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Segments</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCustomer.segments.map((segment) => (
                  <Badge key={segment}>{segment}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium">Timeline</h4>
              <div className="space-y-3">
                {selectedCustomer.timeline.map((event) => (
                  <div key={event.id} className="flex gap-3 border-l-2 border-primary pl-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
