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

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const trackX = useTransform(scrollYProgress, [0, 1], ["5%", "-60%"])
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -70])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative min-h-[250vh] py-section-pad-y overflow-hidden bg-bg"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/[0.05] blur-[150px] rounded-full" />

        {/* Header */}
        <motion.div
          className="absolute top-[10%] text-center z-20 px-6"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <span className="overline block mb-4">Webs Inmersivas</span>
          <h2 className="display-xl text-text mb-3 max-w-2xl mx-auto">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-muted text-base max-w-xl mx-auto">{subheadline}</p>
          )}
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          className="flex items-center gap-6 pl-[5vw]"
          style={{ x: trackX }}
        >
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative flex-shrink-0 w-[42vw] md:w-[28vw] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 42vw, 28vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/70 text-xs font-mono uppercase tracking-wider">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute right-6 bottom-10 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/20 rotate-90">Scroll</span>
          <motion.div
            className="w-4 h-7 rounded-full border border-white/20 flex justify-center pt-1.5"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <div className="w-1 h-1 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
