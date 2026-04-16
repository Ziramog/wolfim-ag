import { cn } from "@/lib/utils/cn"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "warm"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider",
        variant === "default" && "bg-white/5 text-muted border border-border",
        variant === "accent" && "bg-accent/10 text-accent border border-accent/20",
        variant === "warm" && "bg-accent-warm/10 text-accent-warm border border-accent-warm/20",
        className
      )}
    >
      {children}
    </span>
  )
}
