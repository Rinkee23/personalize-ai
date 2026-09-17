import { useState } from "react"
import type { FormEvent } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader } from "../components/ui/Card.tsx"
import { Input } from "../components/ui/Input.tsx"
import { useCreateUser } from "../hooks/useApi.ts"

export default function Settings() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const createUserMutation = useCreateUser()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createUserMutation.mutate({ name, email })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <Card>
        <CardHeader>Add New User</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? "Adding..." : "Add User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
