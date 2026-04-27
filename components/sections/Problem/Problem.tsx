"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import type { PainPoint } from "@/lib/config/site"

function PainPointCard({ title, description, index }: PainPoint & { index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="group relative p-6 md:p-8 bg-surface border border-border hover:border-red-500/20 transition-all duration-300"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h3 className="text-lg font-display text-text mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </motion.div>
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
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-16 md:mb-20">
            {headline}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, i) => (
            <PainPointCard key={point.title} {...point} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}