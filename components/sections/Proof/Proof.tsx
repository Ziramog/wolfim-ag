"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect } from "react"
import { FadeIn } from "@/components/motion/FadeIn"
import type { MetricData, TestimonialData } from "@/lib/config/site"

function MetricCounter({ value, suffix, label }: MetricData) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.19, 1, 0.22, 1],
      })
      return controls.stop
    }
  }, [isInView, count, value])

  return (
    <div ref={ref} className="text-left border-l-2 border-accent pl-6 py-2">
      <div className="flex items-baseline gap-2 mb-1">
        <motion.span className="stat-number text-text leading-none">
          {rounded}
        </motion.span>
        <span className="text-2xl lg:text-4xl font-display text-accent">
          {suffix}
        </span>
      </div>
      <p className="text-xs text-muted uppercase tracking-[0.2em] font-mono mt-4">
        {label}
      </p>
    </div>
  )
}

function TestimonialCard({ quote, author, company, result }: TestimonialData) {
  return (
    <FadeIn>
      <div className="group relative border border-white/10 p-8 min-h-[300px] flex flex-col bg-bg transition-colors duration-300 hover:bg-white/[0.02]">
        
        {/* Quote Mark */}
        <div className="font-display text-6xl text-white/10 absolute top-4 right-6 pointer-events-none group-hover:text-accent/20 transition-colors">
          "
        </div>

        <p className="text-text leading-relaxed mb-12 text-sm font-mono relative z-10 flex-1">
          {quote}
        </p>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 uppercase tracking-wider">
              {result}
            </span>
            <span className="text-xs font-mono text-muted uppercase">VERIFIED_LOG</span>
          </div>
          <div>
            <p className="text-sm font-bold text-text uppercase tracking-tight">{author}</p>
            <p className="text-xs font-mono text-muted mt-1 uppercase">{company}</p>
          </div>
        </div>

        {/* Crosshairs */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </FadeIn>
  )
}

interface ProofProps {
  metrics: MetricData[]
  testimonials: TestimonialData[]
}

export function Proof({ metrics, testimonials }: ProofProps) {
  return (
    <section id="proof" className="relative py-32 bg-bg border-b border-white/10 overflow-hidden">
      <div className="bg-grid" />
      
      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-12 items-end justify-between mb-24">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="section-label text-accent">DATA EN TIEMPO REAL</span>
            </div>
            <h2 className="display-xl text-text leading-[0.85] max-w-2xl">
              RENDIMIENTO
              <br />
              COMPROBADO
            </h2>
          </FadeIn>
          
          <FadeIn className="hidden md:flex flex-col gap-4 text-right border-r border-white/10 pr-6 mb-2">
            <span className="section-label">TELEMETRY_DATA</span>
            <span className="font-mono text-sm text-muted">SOURCE: VERIFIED_CLIENTS</span>
          </FadeIn>
        </div>

        {/* Technical Divider */}
        <div className="tech-divider mb-16" />

        {/* Stats Row */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-32">
            {metrics.map((metric) => (
              <MetricCounter key={metric.label} {...metric} />
            ))}
          </div>
        </FadeIn>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 p-[1px]">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-bg">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}