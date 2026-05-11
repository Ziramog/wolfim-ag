"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const IMAGES = [
  { src: "/images/portfolio/CV1.png", alt: "Web Inmersiva — Clínica" },
  { src: "/images/portfolio/CV2.png", alt: "Web Inmersiva — Restaurant" },
  { src: "/images/portfolio/CV3.png", alt: "Web Inmersiva — Agencia" },
  { src: "/images/portfolio/CV4.png", alt: "Web Inmersiva — E-commerce" },
]

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const [[current, direction], setCurrent] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const next = current + newDirection
    if (next < 0) setCurrent([IMAGES.length - 1, newDirection])
    else if (next >= IMAGES.length) setCurrent([0, newDirection])
    else setCurrent([next, newDirection])
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  return (
    <section id="cases" className="relative py-section-pad-y overflow-hidden bg-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/[0.05] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="overline block mb-4">Webs Inmersivas</span>
          <h2 className="display-xl text-text mb-3 max-w-2xl mx-auto">{headline}</h2>
          {subheadline && <p className="text-muted text-base max-w-xl mx-auto">{subheadline}</p>}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Image container */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden bg-bg-secondary border border-white/[0.06]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={IMAGES[current].src}
                  alt={IMAGES[current].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={current === 0}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Alt text */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/80 text-sm font-mono uppercase tracking-wider">
                    {IMAGES[current].alt}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}