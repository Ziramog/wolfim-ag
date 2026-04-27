"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"

interface CaseShowcaseProps {
  headline: string
  subheadline?: string
}

function CaseVideo({ src }: { src: string }) {
  return (
    <FadeIn delay={0.1}>
      <motion.div
        className="relative w-full max-w-[300px] mx-auto overflow-hidden rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="aspect-[9/16] overflow-hidden">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </FadeIn>
  )
}

export function CaseShowcase({ headline, subheadline }: CaseShowcaseProps) {
  const cases = [
    { src: "/videos/cases/case-1.mp4" },
    { src: "/videos/cases/case-2.mp4" },
  ]

  return (
    <section id="cases" className="relative py-section-pad-y bg-bg">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-[10px] uppercase tracking-[0.3em] text-accent mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Webs Inmersivas
            </motion.span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
              {headline}
            </h2>
            {subheadline && (
              <p className="text-muted text-base max-w-xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-center md:items-start">
          {cases.map((c, i) => (
            <CaseVideo key={i} src={c.src} />
          ))}
        </div>
      </div>
    </section>
  )
}