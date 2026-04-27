"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"

interface CaseShowcaseProps {
  headline: string
  subheadline?: string
}

function CaseVideo({ src, title }: { src: string; title: string }) {
  return (
    <FadeIn delay={0.1}>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-surface border border-border cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Video container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Glass overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Play indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title bar */}
        <div className="p-5 border-t border-border">
          <h3 className="font-body font-semibold text-lg text-text">
            {title}
          </h3>
        </div>
      </motion.div>
    </FadeIn>
  )
}

export function CaseShowcase({ headline, subheadline }: CaseShowcaseProps) {
  const cases = [
    {
      src: "/videos/cases/case-1.mp4",
      title: "Caso de Éxito #1",
    },
    {
      src: "/videos/cases/case-2.mp4",
      title: "Caso de Éxito #2",
    },
  ]

  return (
    <section id="cases" className="relative py-section-pad-y bg-bg">
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />

      <div className="max-w-container mx-auto px-6 md:px-12 relative">
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
              <p className="text-muted text-lg max-w-2xl mx-auto mt-4">
                {subheadline}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Video showcase — stacked vertically */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {cases.map((c, i) => (
            <CaseVideo key={i} src={c.src} title={c.title} />
          ))}
        </div>

        {/* CTA hint */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-muted text-sm">
              ¿Querés ver más casos?{" "}
              <motion.span
                className="text-accent cursor-pointer hover:underline"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Ver portfolio completo →
              </motion.span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}