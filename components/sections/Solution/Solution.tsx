"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { ServiceData } from "@/lib/config/site"

interface SolutionProps {
  headline: string
  services: ServiceData[]
}

function ServiceCard({ service, index, isActive }: { service: ServiceData; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 150)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-black/40 backdrop-blur-md border border-white/10 p-8 overflow-hidden min-h-[300px] flex flex-col"
      style={{ y, rotate, scale }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      whileHover={{ scale: 1.05, borderColor: "rgba(196,255,0,0.5)", boxShadow: "0 0 40px rgba(196,255,0,0.2)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow effect on active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#c4ff00]/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-[#c4ff00]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Number */}
      <div className="font-mono text-[24px] text-white/20 tracking-widest mb-6 leading-none">
        0{index + 1}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-white mb-4 group-hover:text-[#c4ff00] transition-colors flex-1">
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
            <span className="w-2 h-2 rounded-full bg-[#c4ff00] flex-shrink-0" />
            {outcome}
          </li>
        ))}
      </ul>

      {/* Arrow icon */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6 text-[#c4ff00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function Solution({ headline, services }: SolutionProps) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const headlineRotate = useTransform(scrollYProgress, [0, 1], [-1, 1])

  // Mobile marquee

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [services.length])

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative overflow-hidden"
      style={{ minHeight: "120vh" }}
    >
      {/* Background video — desktop only */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/desktop/video-section-loquehacemos.mp4"
      />

      {/* Mobile black background */}
      <div className="absolute inset-0 bg-black z-0 md:hidden" />

      {/* Parallax overlay */}
      <div className="relative z-20 max-w-container mx-auto px-6 md:px-12 py-section-pad-y">
        <motion.div style={{ y: headlineY, rotate: headlineRotate }}>
          <span className="overline block mb-4 text-white/30">Lo que hacemos</span>

          <div className="mb-16">
            <h2 className="display-xl text-white whitespace-nowrap">
              {headline}
            </h2>
          </div>
        </motion.div>

        {/* 4 cards grid with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[50px]">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} isActive={activeIndex === i} />
          ))}
        </div>
      </div>
    </section>
  )
}
