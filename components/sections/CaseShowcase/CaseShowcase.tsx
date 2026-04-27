"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"

interface CaseShowcaseProps {
  headline: string
  subheadline?: string
}

function CaseVideo({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      className="relative flex-1 max-w-[320px] overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Full vertical video */}
      <div className="aspect-[9/16] overflow-hidden rounded-2xl">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom fade for text */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
    </motion.div>
  )
}

export function CaseShowcase({ headline, subheadline }: CaseShowcaseProps) {
  const cases = [
    { src: "/videos/cases/case-1.mp4" },
    { src: "/videos/cases/case-2.mp4" },
  ]

  return (
    <section id="cases" className="relative min-h-screen flex flex-col justify-center py-section-pad-y bg-bg">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-accent-warm/5 blur-[120px] rounded-full" />

      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <span className="overline block mb-4">Webs Inmersivas</span>
          <h2 className="display-xl text-text mb-4 max-w-2xl">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-muted text-lg max-w-xl mb-16">
              {subheadline}
            </p>
          )}
        </FadeIn>

        {/* Vertical videos side by side */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center md:items-stretch">
          {cases.map((c, i) => (
            <CaseVideo key={i} src={c.src} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-16">
            <p className="text-muted text-sm">
              ¿Querés ver más?{" "}
              <span className="text-accent hover-line cursor-pointer">
                Ver portfolio completo →
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}