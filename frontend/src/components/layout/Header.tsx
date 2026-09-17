export function Header() {
  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-border bg-card px-6">
      <button
        type="button"
        className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <BellIcon />
      </button>
      <button
        type="button"
        className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <UserIcon />
      </button>
    </header>
  )
}

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 -D17 12h-2a4 4 0 1 1 0-8 4 4 0 0 1 8 0v2a4 4 0 1 1-8 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
