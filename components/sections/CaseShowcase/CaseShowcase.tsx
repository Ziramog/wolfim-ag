"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const IMAGES = [
  { src: "/images/portfolio/CV1.png", alt: "Web Inmersiva — Clínica" },
  { src: "/images/portfolio/CV2.png", alt: "Web Inmersiva — Restaurant" },
  { src: "/images/portfolio/CV3.png", alt: "Web Inmersiva — Agencia" },
  { src: "/images/portfolio/CV4.png", alt: "Web Inmersiva — E-commerce" },
]

function ScrollImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.88])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? 60 : -60, 0, index % 2 === 0 ? 60 : -60])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const brightness = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, index * 40])

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0"
      style={{
        x,
        zIndex: 10 - index,
      }}
    >
      <motion.div
        className="relative w-[85vw] md:w-[55vw] aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.06]"
        style={{ scale, opacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ filter: useTransform(brightness, (b) => `brightness(${b})`) }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 85vw, 55vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Image index badge */}
        <div className="absolute top-6 left-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Alt text */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white/80 text-sm font-mono uppercase tracking-wider">{alt}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Track horizontal scroll offset for the card row
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  // Section title parallax
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -80])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative min-h-[300vh] py-section-pad-y overflow-hidden bg-bg"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/[0.06] blur-[180px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent-warm/[0.05] blur-[140px] rounded-full" />

        {/* Header text — parallax */}
        <motion.div
          className="absolute top-[12%] left-0 right-0 text-center z-20 px-6"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <span className="overline block mb-4">Webs Inmersivas</span>
          <h2 className="display-xl text-text mb-3 max-w-2xl mx-auto">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-muted text-base max-w-xl mx-auto">
              {subheadline}
            </p>
          )}
        </motion.div>

        {/* Horizontal scrolling card track */}
        <motion.div
          className="flex items-center gap-8 pl-[10vw]"
          style={{ x: trackX }}
        >
          {IMAGES.map((img, i) => (
            <ScrollImage key={img.src} {...img} index={i} />
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1 z-20">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-white/20"
              style={{ width: 24, scaleX: useTransform(scrollYProgress, [i * 0.25, (i + 1) * 0.25], [0.3, 1]) }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute right-8 bottom-1/2 translate-y-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/25 rotate-90">Scroll</span>
          <motion.div
            className="w-4 h-7 rounded-full border border-white/20 flex justify-center pt-1.5"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-1 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
