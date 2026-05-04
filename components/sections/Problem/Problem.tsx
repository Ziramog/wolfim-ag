"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import type { PainPoint } from "@/lib/config/site"

function PainPointCard({ title, description, index, isActive }: PainPoint & { index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger: 150ms delay per card, left-to-right (index 0, 2 then 1, 3 for grid)
            setTimeout(() => setIsVisible(true), index * 150)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  // Alternating direction: left cards from left (-60), right cards from right (+60)
  const isLeftCard = index % 2 === 0
  const initialX = isLeftCard ? -60 : 60

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-black/5 backdrop-blur-sm border border-black/10 p-8 overflow-hidden min-h-[220px] flex flex-col"
      initial={{ opacity: 0, x: initialX }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderColor: isActive ? "rgba(192, 57, 43, 0.4)" : "rgba(0, 0, 0, 0.1)",
        backgroundColor: isActive ? "rgba(192, 57, 43, 0.08)" : "rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Accent line — visible when active */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-[#c0392b] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Number */}
      <div className="font-mono text-[24px] text-black/20 tracking-widest mb-6 leading-none">
        0{index + 1}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-black mb-4 group-hover:text-[#c0392b] transition-colors flex-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-black/60 leading-relaxed">
        {description}
      </p>

      {/* Warning icon */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-5 h-5 text-[#c0392b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

interface ProblemProps {
  headline: string
  painPoints: PainPoint[]
}

export function Problem({ headline, painPoints }: ProblemProps) {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    // Auto-cycle through cards: 0 → 1 → 2 → 3 → repeat
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % painPoints.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [painPoints.length])

  return (
    <section id="problem" className="relative py-section-pad-y overflow-hidden">
      {/* White background */}
      <div className="absolute inset-0 bg-white" />

      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-black/[0.06] blur-[150px] rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-black/[0.04] blur-[120px] rounded-full" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <span className="overline block mb-4 text-black/30">El problema</span>
          <h2 className="display-xl text-black mb-16 max-w-3xl">
            {headline}
          </h2>
        </FadeIn>

        {/* Cards grid - 2 columns on md, 1 on mobile, equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point, i) => (
            <PainPointCard key={point.title} {...point} index={i} isActive={activeIndex === i} />
          ))}
        </div>
      </div>
    </section>
  )
}