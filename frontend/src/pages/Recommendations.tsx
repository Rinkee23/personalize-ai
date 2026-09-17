import { useState } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader } from "../components/ui/Card.tsx"
import { Modal } from "../components/ui/Modal.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Select } from "../components/ui/Select.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Textarea } from "../components/ui/Textarea.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { Recommendation } from "../services/mockData.ts"

const algorithmOptions = [
  { value: "collaborative", label: "Collaborative Filtering" },
  { value: "content-based", label: "Content-Based" },
  { value: "popularity", label: "Popularity-Based" },
  { value: "hybrid", label: "Hybrid" },
  { value: "contextual", label: "Contextual" },
]

const ruleTypes = [
  { value: "include", label: "Include products matching" },
  { value: "exclude", label: "Exclude products matching" },
  { value: "boost", label: "Boost products matching" },
]

export default function Recommendations() {
  const { data: recommendations = [], isLoading } = useQueryMock<Recommendation[]>({
    queryKey: ["recommendations"],
  })
  const [showModal, setShowModal] = useState(false)
  const [algo, setAlgo] = useState("hybrid")
  const [ruleType, setRuleType] = useState("include")
  const [ruleField, setRuleField] = useState("")
  const [ruleValue, setRuleValue] = useState("")

  const handleSave = () => {
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Recommendations</h1>
        <Button onClick={() => setShowModal(true)}>New Recommendation Rule</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>Algorithm Performance</CardHeader>
          <CardContent>
            <div className="h-64">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="mb-4 text-4xl">📊</div>
                  <p>Hybrid algorithm performing best</p>
                  <p className="text-sm">4,100 clicks, 590 conversions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Quick Stats</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span>Total Recommendations Served</span>
                <span className="text-xl font-bold text-primary">176,400</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span>Click-Through Rate</span>
                <span className="text-xl font-bold text-success">12.3%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span>Conversion Rate</span>
                <span className="text-xl font-bold text-secondary">4.8%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span>Active Rules</span>
                <span className="text-xl font-bold text-info">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>Active Rules</CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-3">
              {recommendations.map((rec: Recommendation) => (
                <div
                  key={rec.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{rec.name}</h4>
                      <Badge variant={rec.enabled ? "success" : "warning"}>{rec.enabled ? "Active" : "Inactive"}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                      <span>Algorithm: {rec.algorithm}</span>
                      <span>|</span>
                      <span>Priority: {rec.priority}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              {(recommendations as Recommendation[]).length === 0 && (
                <div className="py-8 text-center text-muted-foreground">No rules configured</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New Recommendation Rule"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Rule Name</label>
            <Input placeholder="e.g., Homepage Recommendations" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Algorithm</label>
            <Select value={algo} onChange={setAlgo} options={algorithmOptions} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Rule Type</label>
            <Select value={ruleType} onChange={setRuleType} options={ruleTypes} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Field</label>
              <Input value={ruleField} onChange={(e) => setRuleField(e.target.value)} placeholder="e.g., category" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Value</label>
              <Input value={ruleValue} onChange={(e) => setRuleValue(e.target.value)} placeholder="e.g., electronics" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Textarea placeholder="Describe this recommendation rule" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
