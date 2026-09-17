import { Outlet } from "react-router"
import { Header } from "./Header.tsx"
import { Sidebar } from "./Sidebar.tsx"

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
