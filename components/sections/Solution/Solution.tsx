"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { ServiceData } from "@/lib/config/site"

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
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
      className="group relative border border-white/10 p-8 min-h-[360px] flex flex-col bg-bg transition-colors duration-300 hover:bg-white/[0.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

      {/* Number */}
      <div className="font-mono text-xs text-muted tracking-widest mb-12 flex justify-between items-center">
        <span>MOD_{index + 1}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-2xl md:text-3xl text-text mb-6 uppercase tracking-tight group-hover:text-accent transition-colors">
        {service.label}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-muted mb-8 leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Outcomes */}
      <ul className="space-y-3 mt-auto pt-6 border-t border-white/10">
        {service.outcomes.map((outcome, i) => (
          <li key={i} className="text-xs font-mono text-white/50 flex items-start gap-3">
            <span className="text-accent mt-[2px]">{">"}</span>
            <span className="uppercase tracking-wider">{outcome}</span>
          </li>
        ))}
      </ul>
      
      {/* Corner Details */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

interface SolutionProps {
  headline: string
  services: ServiceData[]
}

export function Solution({ headline, services }: SolutionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative py-32 overflow-hidden border-b border-white/10"
    >
      <div className="bg-grid" />

      <div className="relative z-20 max-w-container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-20">
          <motion.div style={{ y }} className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="section-label text-accent">NUESTRO PROTOCOLO</span>
            </div>
            
            <h2 className="display-xl text-text leading-[0.85] mb-6">
              {headline}
            </h2>
            
            <p className="text-subhead max-w-md">
              Implementamos infraestructuras digitales de alto rendimiento. 
              Sistemas diseñados con precisión quirúrgica para maximizar la conversión y escalabilidad.
            </p>
          </motion.div>

          <div className="hidden md:flex flex-col gap-4 text-right border-r border-white/10 pr-6">
            <span className="section-label">SERVICES_ONLINE</span>
            <span className="font-mono text-sm text-accent">STATUS: DEPLOYED</span>
            <span className="font-mono text-sm text-muted">MODULES: {services.length}</span>
          </div>
        </div>

        {/* Technical Divider */}
        <div className="tech-divider mb-16" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 p-[1px]">
          {services.map((service, i) => (
            <div key={service.id} className="bg-bg">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
