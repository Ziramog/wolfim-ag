"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import type { PainPoint } from "@/lib/config/site"

// SVG icons — editorial, no emoji
const painIcons = [
  // Money pit
  <svg key="money" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M8 10h8M8 14h8" />
  </svg>,
  // Decoration / Ornament
  <svg key="web" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  // Downward / Decline
  <svg key="down" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>,
  // Clock / Time loss
  <svg key="clock" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
]

function PainPointCard({ icon, title, description, index }: PainPoint & { index: number }) {
  const Icon = painIcons[index % painIcons.length]

  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="group relative p-6 md:p-8 bg-surface border border-border hover:border-red-500/20 transition-all duration-300"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 text-red-400/50 group-hover:text-red-400 transition-colors duration-300 mt-0.5">
            {Icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text mb-2 font-display">
              {title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </div>
        </div>
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