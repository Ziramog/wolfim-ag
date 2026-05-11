"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const IMAGES = [
  { src: "/images/portfolio/CV1.png", alt: "Clínica" },
  { src: "/images/portfolio/CV2.png", alt: "Restaurant" },
  { src: "/images/portfolio/CV3.png", alt: "Agencia" },
  { src: "/images/portfolio/CV4.png", alt: "E-commerce" },
]

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const trackX = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"])

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="overline block mb-4">Portfolio</span>
          <h2 className="display-xl text-text mb-3 max-w-2xl mx-auto">{headline}</h2>
          {subheadline && <p className="text-muted text-base max-w-xl mx-auto">{subheadline}</p>}
        </motion.div>

        {/* Horizontal track driven by scroll */}
        <motion.div
          className="flex items-center gap-8 pl-[5vw]"
          style={{ x: trackX }}
        >
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative flex-shrink-0 w-[50vw] md:w-[35vw] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06]"
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
                sizes="(max-width: 768px) 50vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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