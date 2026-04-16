"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import type { PainPoint } from "@/lib/config/site"

function PainPointCard({ icon, title, description, index }: PainPoint & { index: number }) {
  return (
    <FadeIn delay={index * 0.12}>
      <div className="pain-card group relative p-6 rounded-xl bg-surface border border-border hover:border-red-500/20 transition-all duration-300">
        {/* Subtle red glow on hover */}
        <div className="absolute inset-0 rounded-xl bg-red-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative">
          <span className="text-3xl mb-4 block">{icon}</span>
          <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
          <p className="text-sm text-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </FadeIn>
  )
}

interface ProblemProps {
  headline: string
  painPoints: PainPoint[]
}

export function Problem({ headline, painPoints }: ProblemProps) {
  return (
    <section id="problem" className="relative py-section-pad-y bg-bg">
      {/* Red noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-container mx-auto px-6 md:px-12 relative">
        <FadeIn>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-12 md:mb-16">
            {headline}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {painPoints.map((point, i) => (
            <PainPointCard key={point.title} {...point} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
