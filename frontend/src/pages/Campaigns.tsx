import { useState } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Modal } from "../components/ui/Modal.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Select } from "../components/ui/Select.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Textarea } from "../components/ui/Textarea.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { Campaign } from "../services/mockData.ts"

const channelOptions = [
  { value: "Email", label: "Email" },
  { value: "Web", label: "Web" },
  { value: "In-App", label: "In-App" },
  { value: "SMS", label: "SMS" },
  { value: "Social", label: "Social" },
  { value: "Email + Web", label: "Email + Web" },
  { value: "In-App + Email", label: "In-App + Email" },
  { value: "Email + SMS", label: "Email + SMS" },
  { value: "Web + Social", label: "Web + Social" },
]

export default function Campaigns() {
  const { data: campaigns = [], isLoading } = useQueryMock<Campaign[]>({
    queryKey: ["campaigns"],
  })
  const [showModal, setShowModal] = useState(false)
  const [campName, setCampName] = useState("")
  const [campDesc, setCampDesc] = useState("")
  const [campSegment, setCampSegment] = useState("")
  const [campChannel, setCampChannel] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filtered = campaigns.filter((c) => !statusFilter || c.status === statusFilter)

  const statusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "paused":
        return "warning"
      case "draft":
        return "default"
      case "completed":
        return "info"
      default:
        return "default"
    }
  }

  const handleSave = () => {
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
        <Button onClick={() => setShowModal(true)}>Create Campaign</Button>
      </div>

      <Card>
        <CardContent>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "paused", label: "Paused" },
              { value: "draft", label: "Draft" },
              { value: "completed", label: "Completed" },
            ]}
            placeholder="Filter by status"
            className="max-w-xs"
          />
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading campaigns...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.description}</p>
                  </div>
                  <Badge variant={statusVariant(campaign.status)}>{campaign.status}</Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Target Segment</p>
                    <p className="text-sm font-medium">{campaign.targetSegment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Channel</p>
                    <p className="text-sm font-medium">{campaign.channel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium">{new Date(campaign.startDate).toLocaleDateString()}</p>
                  </div>
                  {campaign.endDate && (
                    <div>
                      <p className="text-xs text-muted-foreground">End Date</p>
                      <p className="text-sm font-medium">{new Date(campaign.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                    <p className="text-lg font-semibold">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                    <p className="text-lg font-semibold">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                    <p className="text-lg font-semibold">{campaign.conversions.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">No campaigns found</div>
          )}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Create Campaign"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Create</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <Input value={campName} onChange={(e) => setCampName(e.target.value)} placeholder="Campaign name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Textarea value={campDesc} onChange={(e) => setCampDesc(e.target.value)} placeholder="Campaign description" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Target Segment</label>
            <Input value={campSegment} onChange={(e) => setCampSegment(e.target.value)} placeholder="Segment name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Channel</label>
            <Select
              value={campChannel}
              onChange={setCampChannel}
              options={channelOptions}
              placeholder="Select channel"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
