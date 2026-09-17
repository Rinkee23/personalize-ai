import { useState } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader } from "../components/ui/Card.tsx"
import { Modal } from "../components/ui/Modal.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Select } from "../components/ui/Select.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Textarea } from "../components/ui/Textarea.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { Segment, SegmentRule } from "../services/mockData.ts"

const operatorOptions = [
  { value: "==", label: "Equals" },
  { value: "!=", label: "Not equals" },
  { value: ">", label: "Greater than" },
  { value: "<", label: "Less than" },
  { value: ">=", label: "Greater or equal" },
  { value: "<=", label: "Less or equal" },
  { value: "contains", label: "Contains" },
]

const fieldOptions = [
  { value: "lifetime_value", label: "Lifetime Value" },
  { value: "total_purchases", label: "Total Purchases" },
  { value: "join_date", label: "Join Date" },
  { value: "last_active", label: "Last Active" },
  { value: "status", label: "Status" },
  { value: "interests", label: "Interests" },
]

export default function Segments() {
  const { data: segments = [], isLoading } = useQueryMock<Segment[]>({
    queryKey: ["segments"],
  })
  const [showModal, setShowModal] = useState(false)
  const [segmentName, setSegmentName] = useState("")
  const [segmentDesc, setSegmentDesc] = useState("")
  const [segmentLogic, setSegmentLogic] = useState<"AND" | "OR">("AND")
  const [rules, setRules] = useState<SegmentRule[]>([{ id: "r1", field: "", operator: "==", value: "" }])

  const addRule = () => {
    setRules([...rules, { id: `r${rules.length + 1}`, field: "", operator: "==", value: "" }])
  }

  const updateRule = (id: string, field: keyof SegmentRule, value: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const handleSave = () => {
    setShowModal(false)
    setSegmentName("")
    setSegmentDesc("")
    setRules([{ id: "r1", field: "", operator: "==", value: "" }])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Segments</h1>
        <Button onClick={() => setShowModal(true)}>Create Segment</Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading segments...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => (
            <Card key={segment.id} className="flex flex-col">
              <CardHeader className="flex items-center justify-between">
                <span>{segment.name}</span>
                <Badge variant={segment.status === "active" ? "success" : "warning"}>{segment.status}</Badge>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{segment.description}</p>
                <div className="space-y-2">
                  {segment.rules.map((rule) => (
                    <div key={rule.id} className="flex items-center gap-2 text-xs">
                      <span className="rounded-md bg-muted px-2 py-1">{rule.field}</span>
                      <span className="text-muted-foreground">{rule.operator}</span>
                      <span className="rounded-md bg-muted px-2 py-1">{rule.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">Logic: {segment.logic}</span>
                  <span className="text-lg font-semibold text-primary">{segment.size}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">users in segment</p>
              </CardContent>
            </Card>
          ))}
          {segments.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">No segments found</div>
          )}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Create Segment"
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
            <Input value={segmentName} onChange={(e) => setSegmentName(e.target.value)} placeholder="Segment name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Textarea value={segmentDesc} onChange={(e) => setSegmentDesc(e.target.value)} placeholder="Describe this segment" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Logic</label>
            <Select
              value={segmentLogic}
              onChange={(v) => setSegmentLogic(v as "AND" | "OR")}
              options={[
                { value: "AND", label: "AND (all rules must match)" },
                { value: "OR", label: "OR (any rule matches)" },
              ]}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Rules</label>
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule.id} className="flex flex-wrap items-center gap-2">
                  <Select
                    value={rule.field}
                    onChange={(v) => updateRule(rule.id, "field", v)}
                    options={fieldOptions}
                    placeholder="Field"
                    className="flex-1 min-w-[120px]"
                  />
                  <Select
                    value={rule.operator}
                    onChange={(v) => updateRule(rule.id, "operator", v)}
                    options={operatorOptions}
                    placeholder="Operator"
                    className="w-28"
                  />
                  <Input
                    value={rule.value}
                    onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                    placeholder="Value"
                    className="flex-1 min-w-[100px]"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addRule} className="mt-3">
              Add Rule
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
