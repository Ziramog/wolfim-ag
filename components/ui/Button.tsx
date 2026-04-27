"use client"

import { cn } from "@/lib/utils/cn"
import { MagneticButton } from "@/components/motion/MagneticButton"

type ButtonVariant = "primary" | "ghost" | "outline" | "text"
type ButtonSize = "sm" | "md" | "lg" | "xl"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  magnetic?: boolean
}

// Editorial system — no pill, varied proportions
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-black font-semibold tracking-tight hover:bg-accent/90 active:scale-[0.98] transition-all duration-200",
  ghost:
    "bg-transparent text-text border-b border-white/30 hover:border-white/60 hover:text-white transition-all duration-300",
  outline:
    "bg-transparent text-text border border-white/10 hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300",
  text:
    "bg-transparent text-muted hover:text-text underline-offset-4 hover:underline transition-all duration-200",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-[11px] tracking-[0.08em] uppercase",
  md: "px-6 py-3 text-sm tracking-[0.04em]",
  lg: "px-8 py-4 text-base tracking-[0.02em]",
  xl: "px-10 py-5 text-lg tracking-[0.01em]",
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const button = (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-3 transition-all duration-200 ease-out cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-body",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  )

  if (magnetic && variant === "primary") {
    return <MagneticButton>{button}</MagneticButton>
  }

  return button
}