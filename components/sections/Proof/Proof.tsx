"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect } from "react"
import { FadeIn } from "@/components/motion/FadeIn"
import type { MetricData, TestimonialData } from "@/lib/config/site"

function MetricCounter({ value, suffix, label }: MetricData) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <motion.span className="text-5xl md:text-6xl font-display text-accent">
          {rounded}
        </motion.span>
        <span className="text-2xl md:text-3xl font-display text-accent/60">
          {suffix}
        </span>
      </div>
      <p className="text-sm text-muted mt-2 font-mono uppercase tracking-wider">
        {label}
      </p>
    </div>
  )
}

function TestimonialCard({ quote, author, company, result }: TestimonialData) {
  return (
    <div className="group p-6 rounded-xl bg-surface border border-border hover:border-accent/15 transition-all duration-300">
      <p className="text-text/90 leading-relaxed mb-4 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-text">{author}</p>
          <p className="text-xs text-muted">{company}</p>
        </div>
        <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full">
          {result}
        </span>
      </div>
    </div>
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
        {/* Metrics */}
        <FadeIn>
          <div className="grid grid-cols-3 gap-8 mb-16 md:mb-24">
            {metrics.map((metric) => (
              <MetricCounter key={metric.label} {...metric} />
            ))}
          </div>
        </FadeIn>

        {/* Testimonials */}
        <FadeIn>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-8 md:mb-12">
            Lo que dicen nuestros clientes
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, i) => (
            <FadeIn key={testimonial.author} delay={i * 0.12}>
              <TestimonialCard {...testimonial} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
