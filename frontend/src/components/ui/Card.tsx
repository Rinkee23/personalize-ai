import type { HTMLAttributes, ReactNode } from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={`mb-4 text-lg font-semibold ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={`text-sm ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}
