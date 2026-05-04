"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import type { HeroData } from "@/lib/config/site"

const DESKTOP_VIDEOS = [
  "/videos/desktop/hero_video_D_1.mp4",
]

const MOBILE_VIDEOS = [
  "/videos/mobile/hero_0.mp4",
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

function AdaptateMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end end"],
  })

  // Single word — vertical rise from below viewport to off-screen top
  const y = useTransform(scrollYProgress, [0, 1], ["105%", "-15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0])

  return (
    <div
      ref={marqueeRef}
      className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
      style={{ height: "200vh" }}
    >
      {/* Stick to bottom of viewport */}
      <div className="sticky bottom-0 h-screen flex flex-col justify-end overflow-hidden pb-[10vh]">
        <motion.div
          className="flex whitespace-nowrap pl-[2vw]"
          style={{ y, opacity }}
        >
          <span
            className="font-display font-black italic tracking-tighter leading-none"
            style={{
              fontSize: "clamp(16rem, 26vw, 32rem)",
              color: "#ef4444",
              WebkitTextStroke: "1px rgba(239,68,68,0.25)",
              textShadow: "0 8px 60px rgba(239,68,68,0.4), 0 0 120px rgba(239,68,68,0.15)",
            }}
          >
            ADAPTATE
          </span>
        </motion.div>
      </div>
    </div>
  )
}

function HeroHeadline({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <motion.h1
      className="font-display leading-[1] tracking-tight max-w-4xl text-left"
      style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', fontWeight: 700, color: '#c4ff00', textShadow: '0 2px 30px rgba(196,255,0,0.2)' }}
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
  },
  redBig: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

function NarrativeText({
  text,
  variant = "soft",
  delay = 0,
  duration,
  textColor = "white",
  fontSize = "clamp(1.25rem,4.5vw,2.5rem)"
}: {
  text: string;
  variant?: keyof typeof narrativeVariants;
  delay?: number;
  duration?: number;
  textColor?: string;
  fontSize?: string;
}) {
  const [visible, setVisible] = useState(true)
  const currentVariant = narrativeVariants[variant]

  useEffect(() => {
    setVisible(true)
    const totalDelay = (delay || 0) * 1000 + (duration || 9999) * 1000
    const timer = setTimeout(() => setVisible(false), totalDelay)
    return () => clearTimeout(timer)
  }, [text, delay, duration])

  if (!visible) return null

  return (
    <motion.div
      key={text}
      initial={currentVariant.initial}
      animate={currentVariant.animate}
      exit={currentVariant.exit}
      transition={{ ...currentVariant.transition, delay }}
      className="absolute bottom-[18%] left-0 w-full px-8 z-40 text-center pointer-events-none"
    >
      <h2 className="font-body font-bold tracking-tight leading-tight mx-auto max-w-[90%]" style={{ color: textColor, fontSize }}>
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

export function Hero({ headline, subheadline, ctaLabel, ctaHref, badge, priceTag }: HeroData) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [revealStage, setRevealStage] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [skippedIntro, setSkippedIntro] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const currentVideos = isMobile ? MOBILE_VIDEOS : DESKTOP_VIDEOS
  const finalIdx = currentVideos.length - 1
  const isFinalScene = activeIdx === finalIdx

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Hero content fades out and moves up as user scrolls through hero section
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -100])

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
    if (activeIdx < finalIdx) {
      const nextIdx = activeIdx + 1

      if (activeIdx === 0 && nextIdx === 1) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 400)
      }

      setRevealStage(0)
      const nextRef = videoRefs.current[nextIdx]

      if (nextRef && nextRef.src) {
        nextRef.currentTime = 0
        nextRef.play().catch(() => {})
      }
      setActiveIdx(nextIdx)
    } else {
      const finalRef = videoRefs.current[finalIdx]
      if (finalRef && finalRef.src) {
        finalRef.currentTime = 0
        finalRef.play().catch(() => {})
      }
    }
  }

  useEffect(() => {
    if (isFinalScene) {
      const t1 = setTimeout(() => setRevealStage(1), 3000)
      const t2 = setTimeout(() => setRevealStage(2), 6500)
      return () => { clearTimeout(t1); clearTimeout(t2); }
    } else {
      setRevealStage(0)
    }
  }, [activeIdx, isFinalScene])

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el
  }

  return (
    <section id="hero" ref={heroRef} className="relative z-0" style={{ height: "200vh" }}>

      {/* Video Layer — stays at back, always full screen */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
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

        {/* Scene Overlays */}
        {activeIdx === 3 && (
          <div className="absolute inset-0 z-20 bg-black/30 pointer-events-none" />
        )}
        {isFinalScene && (
          <div className="absolute inset-0 z-20 bg-black/20 pointer-events-none" />
        )}

        <video
          ref={setVideoRef(0)}
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
          ref={setVideoRef(1)}
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
          ref={setVideoRef(2)}
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
          ref={setVideoRef(3)}
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

      {/* Adaptate horizontal marquee — scroll-driven, desktop only */}
      <div className="hidden md:block">
        <AdaptateMarquee />
      </div>

      {/* Narrative Text Layer */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeIdx === 0 && (
            <NarrativeText key="cambio" text="El cambio esta sucediendo..." delay={1} duration={4} />
          )}
          {activeIdx === 1 && (
            <NarrativeText key="adaptate" text="Adaptate..." variant="redBig" delay={2} duration={3} textColor="#ef4444" fontSize="clamp(2.5rem,8vw,5rem)" />
          )}
        </AnimatePresence>
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "256px",
          }}
        />
      </div>

      {/* Hero Content — scrolls up and fades as you scroll */}
      <motion.div
        className="fixed inset-0 z-40"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <AnimatePresence>
          {(isFinalScene && (revealStage === 2 || finalIdx === 0)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="h-full flex flex-col justify-center pl-[5vw] pr-[10px] md:px-12 max-w-container mx-auto pt-20"
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
                className="text-white text-xl md:text-2xl max-w-xl mt-6 font-medium"
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
                  <a href="/servicios#mantenimiento">Mantenimiento desde $29</a>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Interface */}
      <div className="fixed bottom-8 left-0 w-full z-50 px-6 md:px-12 flex items-end justify-between pointer-events-none">
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

        {isMobile && activeIdx < finalIdx && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={() => {
              const finalRef = videoRefs.current[finalIdx]
              if (finalRef) {
                finalRef.currentTime = 0
                finalRef.play().catch(() => {})
              }
              setActiveIdx(finalIdx)
              setSkippedIntro(true)
            }}
            className="pointer-events-auto backdrop-blur-md bg-white/[0.08] border border-white/[0.15] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white/[0.12] transition-all duration-300 group"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors">
              Saltar intro
            </span>
            <svg className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        )}

        <div className="hidden md:block">
          {isFinalScene && <ScrollCue />}
        </div>

        <div className="w-[80px]" />
      </div>
    </section>
  )
}
