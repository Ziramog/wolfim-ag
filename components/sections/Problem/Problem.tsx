"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { PainPoint } from "@/lib/config/site"

function PainPointCard({ title, description, index, isActive }: PainPoint & { index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  const isLeftCard = index % 2 === 0
  const initialX = isLeftCard ? -80 : 80

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white backdrop-blur-sm border border-black/10 p-8 overflow-hidden min-h-[240px] flex flex-col"
      style={{ y, scale, opacity }}
      initial={{ opacity: 0, x: initialX, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: initialX, scale: 0.8 }}
      whileHover={{ scale: 1.02, y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-[#c0392b]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Number */}
      <div className="font-mono text-[28px] text-black/10 tracking-widest mb-6 leading-none">
        0{index + 1}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-black mb-4 group-hover:text-[#c0392b] transition-colors flex-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-black/60 leading-relaxed">
        {description}
      </p>

      {/* Warning icon */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6 text-[#c0392b]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

interface ProblemProps {
  headline: string
  painPoints: PainPoint[]
}

export function Problem({ headline, painPoints }: ProblemProps) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % painPoints.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [painPoints.length])

  return (
    <section ref={sectionRef} id="problem" className="relative py-section-pad-y overflow-hidden">
      {/* White background */}
      <div className="absolute inset-0 bg-white" />

      {/* Parallax ambient glow */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-black/[0.04] blur-[200px] rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
          <span className="block mb-4 text-black/60 font-mono text-[11px] tracking-[0.2em] uppercase">El problema</span>
          <h2 className="display-xl text-black mb-16 max-w-3xl">
            {headline}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {painPoints.map((point, i) => (
            <PainPointCard key={point.title} {...point} index={i} isActive={activeIndex === i} />
          ))}
        </div>
      </div>
    </section>
  )
}
