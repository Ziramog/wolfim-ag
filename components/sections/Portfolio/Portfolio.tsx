"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { cn } from "@/lib/utils/cn"
import { SITE_CONFIG, PortfolioItem } from "@/lib/config/site"
import Image from "next/image"

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth out the motion
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <FadeIn delay={index * 0.15}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl overflow-hidden bg-surface border border-border aspect-[16/10] md:aspect-[16/9]"
      >
        {/* Immersive Background */}
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end"
        >
          <div className="mb-4">
            <span className="text-accent text-xs font-mono uppercase tracking-widest mb-2 block">
              {item.category}
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-text mb-3">
              {item.title}
            </h3>
            <p className="text-muted text-sm md:text-base max-w-md line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/10 border border-white/5 text-text/70">
                {tag}
              </span>
            ))}
          </div>

          <motion.a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-medium transition-colors hover:bg-accent"
          >
            Ver Proyecto
          </motion.a>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-accent/5 via-transparent to-white/5" />
      </motion.div>
    </FadeIn>
  )
}

export function Portfolio() {
  const { portfolio } = SITE_CONFIG

  return (
    <section id="portfolio" className="relative py-section-pad-y bg-bg">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
              {portfolio.headline}
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {portfolio.items.map((item, idx) => (
            <PortfolioCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
