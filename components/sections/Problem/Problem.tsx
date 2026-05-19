"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { PainPoint } from "@/lib/config/site"

function PainPointCard({ title, description, index }: PainPoint & { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <motion.div
      ref={cardRef}
      className="group relative border border-white/10 p-8 min-h-[240px] flex flex-col transition-colors duration-300 hover:bg-white/[0.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

      {/* Crosshairs on hover */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Number */}
      <div className="font-mono text-xs text-muted tracking-widest mb-8 flex justify-between items-center">
        <span>ERR_CODE: 0{index + 1}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:animate-ping" />
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-2xl text-text mb-4 uppercase tracking-tight group-hover:text-accent transition-colors flex-1">
        {title}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

interface ProblemProps {
  headline: string
  painPoints: PainPoint[]
}

export function Problem({ headline, painPoints }: ProblemProps) {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={sectionRef} id="problem" className="relative py-32 overflow-hidden border-b border-white/10">
      <div className="bg-grid" />
      
      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-20">
          <motion.div style={{ y }} className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-red-500" />
              <span className="section-label text-red-500">DIAGNÓSTICO CRÍTICO</span>
            </div>
            <h2 className="display-xl text-text leading-[0.85] mb-6">
              {headline}
            </h2>
            <p className="text-subhead max-w-md">
              Detectamos patrones de fallo en la infraestructura de marketing tradicional. 
              Estos son los cuellos de botella que limitan el crecimiento de tu empresa.
            </p>
          </motion.div>

          <div className="hidden md:flex flex-col gap-4 text-right border-r border-white/10 pr-6">
            <span className="section-label">SYSTEM_SCAN</span>
            <span className="font-mono text-sm text-muted">ANALYSIS: 100%</span>
            <span className="font-mono text-sm text-red-500">THREATS: {painPoints.length}</span>
          </div>
        </div>

        {/* Technical Divider */}
        <div className="tech-divider mb-16" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 p-[1px]">
          {painPoints.map((point, i) => (
            <div key={point.title} className="bg-bg">
              <PainPointCard {...point} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
