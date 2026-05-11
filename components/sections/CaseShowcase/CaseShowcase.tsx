"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import Image from "next/image"

const IMAGES = [
  { src: "/images/portfolio/CV1.png", alt: "Clínica" },
  { src: "/images/portfolio/CV2.png", alt: "Restaurant" },
  { src: "/images/portfolio/CV3.png", alt: "Agencia" },
  { src: "/images/portfolio/CV4.png", alt: "E-commerce" },
]

export function CaseShowcase({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  useEffect(() => {
    const trackWidth = trackRef.current?.scrollWidth ?? 0
    const containerWidth = trackRef.current?.offsetWidth ?? 0
    const totalScroll = trackWidth - containerWidth + 80 // gap included

    const controls = animate(x, [0, -totalScroll], {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1,
    })

    return controls.stop
  }, [x])

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
        <div ref={trackRef} className="relative overflow-hidden">
          <motion.div className="flex gap-6 w-max" style={{ x }}>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}