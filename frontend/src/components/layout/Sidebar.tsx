import { NavLink } from "react-router"

const navItems = [
  { name: "Home", to: "/" },
  { name: "Dashboard", to: "/dashboard" },
  { name: "Customers", to: "/customers" },
  { name: "Events", to: "/events" },
  { name: "Products", to: "/products" },
  { name: "Segments", to: "/segments" },
  { name: "Campaigns", to: "/campaigns" },
  { name: "Recommendations", to: "/recommendations" },
  { name: "Experiments", to: "/experiments" },
  { name: "Analytics", to: "/analytics" },
  { name: "Settings", to: "/settings" },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col gap-2 overflow-y-auto bg-card p-4">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xl font-bold text-primary">PersonalizeAi</span>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
