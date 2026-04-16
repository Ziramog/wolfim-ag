import { cn } from "@/lib/utils/cn"

interface CardProps {
  variant?: "default" | "elevated" | "featured" | "glass"
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  media?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  default: "bg-surface border border-border",
  elevated: "bg-surface border border-border shadow-lg shadow-black/20",
  featured: "bg-surface border border-accent/20 glow-pulse",
  glass: "bg-white/[0.04] border border-white/10 backdrop-blur-xl",
}

const sizeStyles = {
  sm: "p-4 rounded-lg",
  md: "p-6 rounded-xl",
  lg: "p-8 rounded-2xl",
}

export function Card({
  variant = "default",
  size = "md",
  interactive = false,
  media,
  footer,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        variantStyles[variant],
        sizeStyles[size],
        interactive &&
          "cursor-pointer transition-transform duration-300 ease-out-expo hover:scale-[1.02] hover:border-white/15",
        className
      )}
    >
      {media && <div className="mb-4">{media}</div>}
      {children}
      {footer && <div className="mt-4 pt-4 border-t border-border">{footer}</div>}
    </div>
  )
}
