export type BadgeVariant = "default" | "success" | "warning" | "info" | "destructive"

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  info: "bg-info/20 text-info",
  destructive: "bg-destructive/20 text-destructive",
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className ?? ""}`}
    >
      {children}
    </span>
  )
}
