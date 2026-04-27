"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import type { PainPoint } from "@/lib/config/site"

function PainPointCard({ title, description, index }: PainPoint & { index: number }) {
  return (
    <motion.div
      className="group py-10 border-b border-border last:border-b-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <h3 className="font-display text-xl md:text-2xl text-text mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted">{description}</p>
    </motion.div>
  )
}

interface ProblemProps {
  headline: string
  painPoints: PainPoint[]
}

export function Problem({ headline, painPoints }: ProblemProps) {
  return (
    <section id="problem" className="relative py-section-pad-y bg-bg bg-grid">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <span className="overline block mb-4">El problema</span>
          <h2 className="display-xl text-text mb-16 max-w-3xl">
            {headline}
          </h2>
        </FadeIn>

        <div className="max-w-3xl">
          {painPoints.map((point, i) => (
            <PainPointCard key={point.title} {...point} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}