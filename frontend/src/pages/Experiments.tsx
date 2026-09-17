import { useState } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Modal } from "../components/ui/Modal.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Textarea } from "../components/ui/Textarea.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { Experiment } from "../services/mockData.ts"

const statusVariant = (status: string) => {
  switch (status) {
    case "running":
      return "success"
    case "paused":
      return "warning"
    case "completed":
      return "info"
    default:
      return "default"
  }
}

export default function Experiments() {
  const { data: experiments = [], isLoading } = useQueryMock<Experiment[]>({
    queryKey: ["experiments"],
  })
  const [showModal, setShowModal] = useState(false)
  const [expName, setExpName] = useState("")
  const [expDesc, setExpDesc] = useState("")

  const handleSave = () => {
    setShowModal(false)
  }

  const getVariantColor = (variantId: string, winner?: string) => {
    if (winner === variantId) return "text-success"
    return "text-foreground"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Experiments</h1>
        <Button onClick={() => setShowModal(true)}>New Experiment</Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading experiments...</div>
      ) : (
        <div className="space-y-6">
          {experiments.map((experiment) => (
            <Card key={experiment.id}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{experiment.name}</h3>
                      <Badge variant={statusVariant(experiment.status)}>{experiment.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{experiment.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Started: {new Date(experiment.startDate).toLocaleDateString()}
                      {experiment.endDate && ` | Ended: ${new Date(experiment.endDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {experiment.status === "running" && (
                      <>
                        <Button size="sm" variant="outline">Pause</Button>
                        <Button size="sm" variant="destructive">Stop</Button>
                      </>
                    )}
                    {experiment.status === "paused" && (
                      <Button size="sm">Resume</Button>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium">Variants</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {experiment.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className={`rounded-lg border border-border p-4 ${experiment.winner === variant.id ? "border-success bg-success/5" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium ${getVariantColor(variant.id, experiment.winner)}`}>
                            {variant.name}
                            {experiment.winner === variant.id && " (Winner)"}
                          </h5>
                          <span className="text-sm text-muted-foreground">{variant.traffic}% traffic</span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Visitors</p>
                            <p className="text-sm font-semibold">{variant.visitors.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Conversions</p>
                            <p className="text-sm font-semibold">{variant.conversions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Conv. Rate</p>
                            <p className="text-sm font-semibold">{variant.conversionRate.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {experiment.confidence && (
                  <div className="mt-4 rounded-lg bg-muted p-3">
                    <p className="text-sm">
                      <span className="font-medium">Confidence:</span> {experiment.confidence}%
                      {experiment.confidence >= 95 && experiment.winner && (
                        <span className="ml-2 text-success">- Winner declared</span>
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {experiments.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">No experiments found</div>
          )}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New Experiment"
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
            <Input value={expName} onChange={(e) => setExpName(e.target.value)} placeholder="Experiment name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Textarea value={expDesc} onChange={(e) => setExpDesc(e.target.value)} placeholder="What are you testing?" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Variants</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input value="Control" readOnly className="w-32" />
                <Input type="number" placeholder="50" className="w-20" />
                <span className="text-sm text-muted-foreground">% traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <Input value="Variant A" readOnly className="w-32" />
                <Input type="number" placeholder="50" className="w-20" />
                <span className="text-sm text-muted-foreground">% traffic</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
