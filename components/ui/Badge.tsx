import { cn } from "@/lib/utils/cn"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "warm" | "overline"
  className?: string
}

// Editorial badge — no rounded-full, category tag style
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] tracking-[0.15em] uppercase",
        variant === "default" && "text-muted",
        variant === "accent" && "text-accent",
        variant === "warm" && "text-accent-warm",
        variant === "overline" && "text-white/40 border-b border-white/20 pb-0.5",
        className
      )}
    >
      {children}
    </span>
  )
}