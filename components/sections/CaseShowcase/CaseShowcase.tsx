"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const IMAGES = [
  { src: "/images/portfolio/CV1.png", alt: "Case 1" },
  { src: "/images/portfolio/CV2.png", alt: "Case 2" },
  { src: "/images/portfolio/CV3.png", alt: "Case 3" },
  { src: "/images/portfolio/CV4.png", alt: "Case 4" },
]

function CaseCard({ src, alt, index, total }: { src: string; alt: string; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const angle = (index / total) * Math.PI * 2
  const radius = 520

  const x = useTransform(scrollYProgress, [0, 1], [0, 0])
  const y = useTransform(scrollYProgress, [0, 1], [radius * Math.sin(angle * 0.3 + scrollYProgress.get()), -radius * Math.cos(angle * 0.3 + scrollYProgress.get())])
  const z = useTransform(scrollYProgress, [0, 1], [0, 0])
  const rotateY = useTransform(scrollYProgress, [0, 1], [index * (360 / total), index * (360 / total) + 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      className="absolute left-1/2 top-1/2"
      style={{
        x: useTransform(scrollYProgress, [0, 1], [Math.sin(angle) * radius, Math.sin(angle) * radius * 0.5]),
        y: useTransform(scrollYProgress, [0, 1], [-Math.cos(angle) * radius + radius, -Math.cos(angle) * radius * 0.5]),
        z: useTransform(scrollYProgress, [0, 1], [Math.sin(angle * 2) * 100, 0]),
        rotateY,
        scale,
        opacity,
      }}
    >
      <div className="relative w-[280px] md:w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="340px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </motion.div>
  )
}

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720])
  const innerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-section-pad-y overflow-hidden bg-bg"
    >
      {/* Section text */}
      <div className="max-w-container mx-auto px-6 md:px-12 relative z-20 text-center mb-12">
        <span className="overline block mb-4">Webs Inmersivas</span>
        <h2 className="display-xl text-text mb-4 max-w-2xl mx-auto">
          {headline}
        </h2>
        {subheadline && (
          <p className="text-muted text-lg max-w-xl mx-auto">
            {subheadline}
          </p>
        )}
      </div>

      {/* 3D Carousel stage */}
      <div className="relative w-full" style={{ perspective: "1200px", perspectiveOrigin: "50% 60%" }}>
        <motion.div
          className="relative w-full flex items-center justify-center"
          style={{
            height: "520px",
            rotateY,
            scale: innerScale,
            transformStyle: "preserve-3d",
          }}
        >
          {IMAGES.map((img, i) => (
            <CaseCard key={img.src} {...img} index={i} total={IMAGES.length} />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-1.5 rounded-full bg-accent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
