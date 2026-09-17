import { useState, type ReactNode } from "react"
import { Input } from "./Input.tsx"

export interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  sortable?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  onRowClick?: (item: T) => void
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No data found",
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const filtered = data.filter((item) => {
    if (!search) return true
    return columns.some((col) => {
      const val = item[col.key as keyof T]
      return String(val ?? "").toLowerCase().includes(search.toLowerCase())
    })
  })

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0
    const aVal = a[sortKey as keyof T]
    const bVal = b[sortKey as keyof T]
    if (aVal == null) return 1
    if (bVal == null) return -1
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      )}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground ${col.sortable !== false ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {sortKey === col.key && (
                      <span>{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className={`transition-colors ${onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
