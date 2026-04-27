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
    <div ref={ref} className="text-left">
      <div className="flex items-baseline gap-1 mb-2">
        <motion.span className="stat-number text-accent">
          {rounded}
        </motion.span>
        <span className="text-3xl font-display text-accent/50">
          {suffix}
        </span>
      </div>
      <p className="text-xs text-muted uppercase tracking-wider font-mono">
        {label}
      </p>
    </div>
  )
}

function TestimonialCard({ quote, author, company, result }: TestimonialData) {
  return (
    <FadeIn>
      <div className="glass rounded-2xl p-6 card-hover h-full">
        <p className="text-text/90 leading-relaxed mb-6 text-sm">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text">{author}</p>
            <p className="text-xs text-muted">{company}</p>
          </div>
          <span className="text-xs font-mono text-accent border border-accent/20 px-2.5 py-1 uppercase tracking-wider flex-shrink-0">
            {result}
          </span>
        </div>
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
    <section id="proof" className="relative py-section-pad-y bg-bg">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Stats row */}
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-20 md:mb-28">
            {metrics.map((metric) => (
              <MetricCounter key={metric.label} {...metric} />
            ))}
          </div>
        </FadeIn>

        {/* Section label */}
        <FadeIn>
          <span className="overline block mb-6">Resultados reales</span>
          <h2 className="display-xl text-text mb-12 max-w-2xl">
            Lo que dicen nuestros clientes
          </h2>
        </FadeIn>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}