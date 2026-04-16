"use client"

import { cn } from "@/lib/utils/cn"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function ParallaxSection({ children, className, id }: ParallaxSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden", className)}
      style={{ isolation: "isolate" }}
    >
      {children}
    </section>
  )
}
