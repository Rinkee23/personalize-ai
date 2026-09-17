import { Link } from "react-router"
import { Button } from "../components/ui/Button.tsx"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <h1 className="text-5xl font-bold text-foreground">
        Welcome to PersonalizeAi
      </h1>
      <p className="max-w-2xl text-center text-lg text-muted-foreground">
        Your intelligent dashboard for data-driven insights and personalized
        recommendations.
      </p>
      <div className="flex gap-4">
        <Link to="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
        <Link to="/analytics">
          <Button variant="outline" size="lg">
            View Analytics
          </Button>
        </Link>
      </div>
    </div>
  )
}
