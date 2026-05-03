"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import type { ServiceData } from "@/lib/config/site"

interface SolutionProps {
  headline: string
  services: ServiceData[]
}

function ServiceCard({ service, index, isActive }: { service: ServiceData; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger: 150ms delay per card, left-to-right
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
      className="group relative bg-black/20 backdrop-blur-sm border border-white/[0.08] p-8 overflow-hidden min-h-[280px] flex flex-col"
      initial={{ opacity: 0, x: initialX }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderColor: isActive ? "rgba(200, 255, 0, 0.4)" : "rgba(255, 255, 255, 0.08)",
        backgroundColor: isActive ? "rgba(200, 255, 0, 0.08)" : "rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Accent line — visible when active */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-accent origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Number */}
      <div className="font-mono text-[24px] text-white/20 tracking-widest mb-6 leading-none">
        0{index + 1}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-white mb-4 group-hover:text-accent transition-colors flex-1">
        {service.label}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/50 mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Outcomes */}
      <ul className="space-y-2">
        {service.outcomes.map((outcome, i) => (
          <li key={i} className="text-sm text-white/40 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {outcome}
          </li>
        ))}
      </ul>

      {/* Arrow icon */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function Solution({ headline, services }: SolutionProps) {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    // Auto-cycle through cards: 0 → 1 → 2 → 3 → repeat
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [services.length])

  return (
    <section
      id="solution"
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background video specific to this section */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/desktop/video-section-loquehacemos.mp4"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-container mx-auto px-6 md:px-12 py-section-pad-y">
        <FadeIn>
          <span className="overline block mb-4 text-white/30">Lo que hacemos</span>

          {/* Header row: 40x40 square + headline */}
          <div className="flex items-start gap-6 mb-16">
            {/* 40x40px transparent window to hero video */}
            <div className="w-10 h-10 flex-shrink-0 border border-white/[0.12]" />
            <h2 className="display-xl text-white max-w-3xl">
              {headline}
            </h2>
          </div>
        </FadeIn>

        {/* 4 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-[50px]">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} isActive={activeIndex === i} />
          ))}
        </div>
      </div>
    </section>
  )
}