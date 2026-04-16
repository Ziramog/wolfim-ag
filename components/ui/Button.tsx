"use client"

import { cn } from "@/lib/utils/cn"
import { MagneticButton } from "@/components/motion/MagneticButton"

type ButtonVariant = "primary" | "ghost" | "outline" | "danger"
type ButtonSize = "sm" | "md" | "lg" | "xl"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  magnetic?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-black font-semibold shadow-[0_8px_32px_rgba(200,255,0,0.25)] hover:shadow-[0_12px_40px_rgba(200,255,0,0.35)] hover:scale-[1.03]",
  ghost: "bg-transparent text-text hover:bg-white/5",
  outline:
    "bg-transparent text-text border border-border hover:bg-white/5 hover:border-white/20",
  danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
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
        "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 ease-out-expo cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon
      )}
      {children}
    </button>
  )

  if (magnetic) {
    return <MagneticButton>{button}</MagneticButton>
  }

  return button
}
