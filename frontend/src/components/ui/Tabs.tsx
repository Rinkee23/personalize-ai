import type { ReactNode } from "react"

export interface TabsProps {
  tabs: { id: string; label: string; content: ReactNode }[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const initialTab = defaultTab ?? tabs[0]?.id ?? ""
  const initialIndex = tabs.findIndex((t) => t.id === initialTab)
  const activeIndex = initialIndex >= 0 ? initialIndex : 0

  return (
    <div className={className}>
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab.id === tabs[activeIndex].id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeIndex].content}</div>
    </div>
  )
}
