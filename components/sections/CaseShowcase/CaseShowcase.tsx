"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const IMAGES = [
  { src: "/images/portfolio/CV1.png", alt: "Clínica" },
  { src: "/images/portfolio/CV2.png", alt: "Restaurant" },
  { src: "/images/portfolio/CV3.png", alt: "Agencia" },
  { src: "/images/portfolio/CV4.png", alt: "E-commerce" },
]

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth
    const visibleWidth = track.offsetWidth
    const scrollAmount = totalWidth / 2 - visibleWidth + 24

    let startTime: number | null = null
    const duration = 30

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % (duration * 1000)) / (duration * 1000)
      const x = -scrollAmount * progress
      track.style.transform = `translateX(${x}px)`
      requestAnimationFrame(step)
    }

    const rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section id="cases" className="relative py-section-pad-y overflow-hidden bg-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/[0.05] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="overline block mb-4">Portfolio</span>
          <h2 className="display-xl text-text mb-3 max-w-2xl mx-auto">{headline}</h2>
          {subheadline && <p className="text-muted text-base max-w-xl mx-auto">{subheadline}</p>}
        </motion.div>

        {/* Auto-scrolling track */}
        <div ref={trackRef} className="flex gap-6 w-max">
          {[...IMAGES, ...IMAGES].map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative flex-shrink-0 w-[60vw] md:w-[38vw] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 38vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}