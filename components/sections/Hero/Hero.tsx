"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import type { HeroData } from "@/lib/config/site"

function GeometricRings() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div ref={ref} className="absolute right-[5%] top-[15%] w-[800px] h-[800px] opacity-20 pointer-events-none hidden lg:block">
      <motion.svg viewBox="0 0 100 100" className="w-full h-full text-accent" style={{ scale }}>
        <motion.circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ rotate: rotate1, transformOrigin: "50% 50%" }} strokeDasharray="4 12" />
        <motion.circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" style={{ rotate: rotate2, transformOrigin: "50% 50%" }} strokeDasharray="20 5" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        {/* Crosshairs inside the rings */}
        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
      </motion.svg>
    </div>
  )
}

export function Hero({ headline, subheadline, ctaLabel, ctaHref, badge, priceTag }: HeroData) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden border-b border-white/10">
      {/* Background Grid */}
      <div className="bg-grid" />
      
      {/* Corner Crosshairs */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-muted/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-muted/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-muted/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-muted/30 pointer-events-none" />

      {/* Decorative Blueprint Rings */}
      <GeometricRings />

      <motion.div 
        className="max-w-container mx-auto w-full px-6 md:px-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-1 lg:col-span-9 flex flex-col items-start">
            
            <motion.div variants={itemVariants} className="mb-8 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-accent" />
              <Badge variant="accent" className="tracking-[0.2em]">{badge}</Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="display-xl text-text relative"
            >
              <span className="block mb-2">AGENCIA</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">DE PRECISIÓN</span>
              <span className="block text-accent italic pr-4">DIGITAL.</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mt-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-[1px] h-12 bg-white/20 hidden md:block" />
              <p className="text-subhead max-w-xl text-lg">
                {subheadline}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16 flex flex-col sm:flex-row gap-6">
              <Button variant="primary" size="xl" className="rounded-none border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-black">
                <a href={ctaHref} className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-currentColor" />
                  {ctaLabel}
                </a>
              </Button>
              <Button variant="outline" size="xl" className="rounded-none border-white/20 hover:border-white text-white">
                <a href="/servicios#mantenimiento" className="font-mono text-xs tracking-widest">VER ESPECIFICACIONES</a>
              </Button>
            </motion.div>

          </div>

          <div className="col-span-1 lg:col-span-3 flex flex-wrap md:flex-row lg:flex-col justify-start lg:justify-end gap-8 lg:gap-12 lg:border-l lg:border-white/10 lg:pl-12 pt-12 lg:pt-0">
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span className="section-label">STATUS</span>
              <span className="text-white font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SISTEMAS ONLINE
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span className="section-label">MANTENIMIENTO</span>
              <span className="text-white font-mono">DESDE $29/MES</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span className="section-label">UBICACIÓN</span>
              <span className="text-white font-mono">BUENOS AIRES, AR</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Technical Data Bar at bottom */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/50 backdrop-blur-md hidden md:flex items-center px-12 py-3 gap-12"
      >
        <motion.span variants={itemVariants} className="section-label">SYS_01 // ACTIVE</motion.span>
        <motion.span variants={itemVariants} className="section-label text-white/30">GRID_STABLE</motion.span>
        <motion.span variants={itemVariants} className="section-label text-white/30 ml-auto">V_4.2.0</motion.span>
      </motion.div>

    </section>
  )
}
