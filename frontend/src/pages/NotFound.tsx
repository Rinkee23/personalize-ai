import { Link } from "react-router"
import { Button } from "../components/ui/Button.tsx"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
