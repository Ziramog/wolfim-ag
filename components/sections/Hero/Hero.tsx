"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ParallaxSection } from "@/components/motion/ParallaxSection"
import { Layer } from "@/components/motion/Layer"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import type { HeroData } from "@/lib/config/site"

const DESKTOP_VIDEOS = [
  "/videos/desktop/hero_video_D.mp4",
  "/videos/desktop/hero_video_D_1.mp4",
]

const MOBILE_VIDEOS = [
  "/videos/mobile/hero_1_antes.mp4",
  "/videos/mobile/hero_1_hoy.mp4",
  "/videos/mobile/7547848-uhd_2160_3840_25fps.mp4",
  "/videos/mobile/hero_2_M.mp4",
]

const wordVariant = {
  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      y: { type: "spring", damping: 25, stiffness: 200 },
      opacity: { duration: 0.8 },
      filter: { duration: 0.8, ease: "easeOut" }
    },
  },
}

function HeroHeadline({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <motion.h1
      className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={wordVariant}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

const narrativeVariants = {
  soft: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  },
  glitch: {
    initial: { opacity: 0, x: -10, filter: "blur(8px)" },
    animate: { 
      opacity: 1, 
      x: [0, -2, 2, 0], 
      filter: "blur(0px)",
    },
    exit: { opacity: 0, filter: "blur(8px)" },
    transition: { 
      duration: 0.8, 
      x: { repeat: 1, duration: 0.1, ease: "linear" } 
    }
  },
  impact: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { type: "spring", damping: 15, stiffness: 300 }
  }
}

function NarrativeText({ 
  text, 
  variant = "soft",
  delay = 0 
}: { 
  text: string; 
  variant?: keyof typeof narrativeVariants;
  delay?: number 
}) {
  const currentVariant = narrativeVariants[variant]
  
  return (
    <motion.div
      key={text}
      initial={currentVariant.initial}
      animate={currentVariant.animate}
      exit={currentVariant.exit}
      transition={{ ...currentVariant.transition, delay }}
      className="absolute bottom-[18%] left-0 w-full px-8 z-40 text-center pointer-events-none"
    >
      <h2 className="font-body font-bold text-[clamp(1.25rem,4.5vw,2.5rem)] text-white tracking-tight leading-tight mx-auto max-w-[90%]">
        {text}
      </h2>
    </motion.div>
  )
}

function ScrollCue() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-cue">
      <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
        <motion.div
          className="w-1 h-2.5 rounded-full bg-accent"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

export function Hero({ headline, subheadline, ctaLabel, ctaHref, badge }: HeroData) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [revealStage, setRevealStage] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const videoRef3 = useRef<HTMLVideoElement>(null)
  const videoRef4 = useRef<HTMLVideoElement>(null)

  const currentVideos = isMobile ? MOBILE_VIDEOS : DESKTOP_VIDEOS
  const finalIdx = currentVideos.length - 1
  const isFinalScene = activeIdx === finalIdx

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const isReveal = activeIdx === currentVideos.length - 1
    window.dispatchEvent(new CustomEvent("wolfimNarrativeState", { 
      detail: { isReveal } 
    }))
  }, [activeIdx, currentVideos.length])

  const handleVideoEnd = () => {
    // Only continue narrative if there are more videos
    if (activeIdx < finalIdx) {
      const nextIdx = activeIdx + 1
      
      if (activeIdx === 0 && nextIdx === 1) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 400)
      }

      setRevealStage(0)
      
      const refs = [videoRef1, videoRef2, videoRef3, videoRef4]
      const nextRef = refs[nextIdx]?.current
      
      if (nextRef && nextRef.src) {
        nextRef.currentTime = 0
        nextRef.play().catch(() => {})
      }
      setActiveIdx(nextIdx)
    } else {
      // Loop the final scene
      const refs = [videoRef1, videoRef2, videoRef3, videoRef4]
      const finalRef = refs[finalIdx]?.current
      if (finalRef && finalRef.src) {
        finalRef.currentTime = 0
        finalRef.play().catch(() => {})
      }
    }
  }

  // Timer-based revealed for Scene 4 sub-stages
  useEffect(() => {
    if (isFinalScene) {
      const t1 = setTimeout(() => setRevealStage(1), 3000) // "Adaptate"
      const t2 = setTimeout(() => setRevealStage(2), 6500) // Hero UI
      return () => { clearTimeout(t1); clearTimeout(t2); }
    } else {
      setRevealStage(0)
    }
  }, [activeIdx, isFinalScene])

  return (
    <ParallaxSection className="h-screen min-h-[600px]" id="hero">
      {/* Layer 0 — Cinematic Video Playlist with Crossfade */}
      <Layer depth={0} type="background" blur={false} scale>
        <div className="relative w-full h-full bg-black overflow-hidden">
          {/* Global Transition Effects (Glitch/Flash) */}
          <AnimatePresence>
            {isGlitching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                className="absolute inset-0 z-50 bg-white/20 backdrop-invert-[0.2]"
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>

          {/* Scene-specific Overlays */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div 
                  key="analog-effects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im5vaXNlRmlsdGVyIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiLz48L3N2Zz4=')] bg-repeat" />
                </motion.div>
              {activeIdx === 1 && (
                <motion.div 
                  key="noise-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"
                >
                  <div className="absolute inset-0 radial-vignette opacity-25" />
                </motion.div>
              )}
              {activeIdx === 2 && (
                <motion.div 
                  key="transform-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/10 mix-blend-overlay"
                />
              )}
              {activeIdx === 3 && (
                <motion.div 
                  key="future-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-blue-500/5 mix-blend-screen"
                />
              )}
            </AnimatePresence>
          </div>

          <video
            ref={videoRef1}
            src={currentVideos[0] || ""}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-[1200ms] ease-in-out",
              activeIdx === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          />
          <video
            ref={videoRef2}
            src={currentVideos[1] || ""}
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-[1200ms] ease-in-out",
              activeIdx === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          />
          <video
            ref={videoRef3}
            src={currentVideos[2] || ""}
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-[1200ms] ease-in-out",
              activeIdx === 2 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          />
          <video
            ref={videoRef4}
            src={currentVideos[3] || ""}
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-[1200ms] ease-in-out",
              activeIdx === 3 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          />
        </div>
      </Layer>

      {/* Layer 1 — Noise texture overlay & Narrative Text */}
      <Layer depth={1} type="background" speed={0.2}>
        {/* Narrative Text Overlay with Parallax Depth */}
        <div className="absolute inset-0 pointer-events-none z-40">
          <AnimatePresence mode="wait">
            {activeIdx === 0 && (
              <NarrativeText key="antes" text="Antes..." delay={0.8} />
            )}
            {activeIdx === 1 && finalIdx >= 1 && (
              <NarrativeText key="atencion" text="Todo compite por tu atención" variant="glitch" delay={0.3} />
            )}
            {activeIdx === 2 && finalIdx >= 2 && (
              <NarrativeText key="cambio" text="El cambio ya ocurrió" variant="impact" delay={1.2} />
            )}
            {isFinalScene && finalIdx > 0 && (
              <div key="final-sequence" className="contents">
                {revealStage === 0 && (
                  <NarrativeText key="proximo" text="Movete a la velocidad de lo que viene" />
                )}
                {revealStage === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="absolute bottom-[18%] left-0 w-full text-center px-8 z-40"
                  >
                    <h2 className="font-body font-bold text-[clamp(1.25rem,4.5vw,2.5rem)] text-white tracking-tight leading-tight mx-auto max-w-[90%]">
                      Adaptate. O quedate atrás.
                    </h2>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "256px",
          }}
        />
      </Layer>

      {/* Layer 3 — Main content (foreground) */}
      <Layer depth={3} type="content">
        <AnimatePresence>
          {(isFinalScene && (revealStage === 2 || finalIdx === 0)) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="h-full flex flex-col justify-center px-6 md:px-12 max-w-container mx-auto pt-20"
            >
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="accent" className="mb-6">
                    {badge}
                  </Badge>
                </motion.div>
              )}

              <HeroHeadline text={headline} />

              <motion.p
                className="text-muted text-lg md:text-xl max-w-xl mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {subheadline}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button variant="primary" size="xl" magnetic>
                  <a href={ctaHref}>{ctaLabel}</a>
                </Button>
                <Button variant="ghost" size="xl">
                  <a href="#solution">Ver servicios</a>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layer>

      {/* Bottom Interface: Sound Toggle & Scroll Cue */}
      <div className="absolute bottom-8 left-0 w-full z-50 px-6 md:px-12 flex items-end justify-between pointer-events-none">
        {/* Subtle Sound Toggle */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="group flex items-center gap-3 transition-colors duration-300"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            <div className="flex items-center gap-[2px] h-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={isMuted ? { height: 2 } : { height: [4, 12, 6, 12, 4] }}
                  transition={isMuted ? {} : { duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                  className="w-[2px] bg-white/40 group-hover:bg-accent transition-colors"
                />
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
              {isMuted ? "Sound Off" : "Sound On"}
            </span>
          </button>
        </div>

        <div className="hidden md:block">
          {isFinalScene && <ScrollCue />}
        </div>

        {/* Placeholder for symmetry or secondary action */}
        <div className="w-[80px]" />
      </div>
    </ParallaxSection>
  )
}
