"use client"

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { useRef, useEffect } from "react"
import { useReducedMotion } from "@/lib/hooks/useReducedMotion"
import { useWindowSize } from "@/lib/hooks/useWindowSize"
import { cn } from "@/lib/utils/cn"

type LayerDepth = 0 | 1 | 2 | 3 | 4 | 5
type LayerType = "background" | "content" | "floating" | "fx"
type LayerAxis = "y" | "x" | "both"

interface LayerProps {
  children: React.ReactNode
  depth: LayerDepth
  type?: LayerType
  axis?: LayerAxis
  speed?: number
  blur?: boolean
  scale?: boolean
  mouseReactive?: boolean
  className?: string
}

const DEPTH_CONFIG: Record<
  LayerDepth,
  {
    zIndex: number
    speed: number
    opacity: number
    blurAmount: string
    scaleBase: number
  }
> = {
  0: { zIndex: 0, speed: 0.15, opacity: 0.6, blurAmount: "2px", scaleBase: 1.15 },
  1: { zIndex: 10, speed: 0.3, opacity: 0.8, blurAmount: "1px", scaleBase: 1.08 },
  2: { zIndex: 20, speed: 0.5, opacity: 0.9, blurAmount: "0px", scaleBase: 1.03 },
  3: { zIndex: 30, speed: 0.7, opacity: 1.0, blurAmount: "0px", scaleBase: 1.0 },
  4: { zIndex: 40, speed: 0.9, opacity: 1.0, blurAmount: "0px", scaleBase: 1.0 },
  5: { zIndex: 50, speed: 1.1, opacity: 0.7, blurAmount: "0px", scaleBase: 1.0 },
}

export function Layer({
  children,
  depth,
  type = "content",
  axis = "y",
  speed: speedOverride,
  blur = false,
  scale = false,
  mouseReactive = false,
  className,
}: LayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { width } = useWindowSize()
  const isMobile = width < 768

  const config = DEPTH_CONFIG[depth]
  const effectiveSpeed = speedOverride ?? config.speed

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yRange = effectiveSpeed * 200
  const xRange = effectiveSpeed * 100

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    axis !== "x" ? [-yRange, yRange] : [0, 0]
  )

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    axis !== "y" ? [-xRange, xRange] : [0, 0]
  )

  // Mouse-reactive parallax (desktop only)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (!mouseReactive || isMobile || reducedMotion) return

    const sensitivity = (depth - 2.5) * 8
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set((e.clientX - centerX) * sensitivity * 0.01)
      mouseY.set((e.clientY - centerY) * sensitivity * 0.01)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseReactive, isMobile, reducedMotion, depth, mouseX, mouseY])

  // Reduced motion fallback
  if (reducedMotion) {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0", className)}
        style={{ zIndex: config.zIndex, opacity: config.opacity }}
      >
        {children}
      </div>
    )
  }

  // Mobile: reduce intensity
  const mobileMultiplier = isMobile ? 0.3 : 1
  const yMobile = useTransform(y, (v) => v * mobileMultiplier)

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute inset-0",
        type === "fx" && "pointer-events-none",
        className
      )}
      style={{
        zIndex: config.zIndex,
        opacity: config.opacity,
        y: isMobile ? yMobile : y,
        x: isMobile ? 0 : x,
        ...(mouseReactive && !isMobile
          ? { translateX: mouseX, translateY: mouseY }
          : {}),
        ...(blur ? { filter: `blur(${config.blurAmount})` } : {}),
        ...(scale ? { scale: config.scaleBase } : {}),
      }}
    >
      {children}
    </motion.div>
  )
}
