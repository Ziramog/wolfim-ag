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
  "/videos/mobile/7547848-uhd_2160_3840_25fps.mp4",
  "/videos/mobile/hero_2_M.mp4",
]

const wordVariant = {
  hidden: { y: 60, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 180,
      filter: { type: "tween", duration: 0.6, ease: "easeOut" },
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
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const currentVideos = isMobile ? MOBILE_VIDEOS : DESKTOP_VIDEOS

  const handleVideoEnd = () => {
    if (currentVideos.length <= 1) {
      // Loop same video if only one
      const ref = activeIdx === 0 ? videoRef1.current : videoRef2.current
      if (ref) {
        ref.currentTime = 0
        ref.play()
      }
      return
    }

    const nextIdx = (activeIdx + 1) % currentVideos.length
    
    if (nextIdx === 0 && videoRef1.current) {
      videoRef1.current.currentTime = 0
      videoRef1.current.play()
    } else if (nextIdx === 1 && videoRef2.current) {
      videoRef2.current.currentTime = 0
      videoRef2.current.play()
    }
    
    setActiveIdx(nextIdx)
  }

  return (
    <ParallaxSection className="h-screen min-h-[600px]" id="hero">
      {/* Layer 0 — Cinematic Video Playlist with Crossfade */}
      <Layer depth={0} type="background" blur={false} scale>
        <div className="relative w-full h-full bg-black overflow-hidden">
          {/* Video Buffer 1 */}
          <video
            ref={videoRef1}
            src={currentVideos[0] || ""}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-1000",
              activeIdx === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          />
          {/* Video Buffer 2 */}
          <video
            ref={videoRef2}
            src={currentVideos[1] || currentVideos[0] || ""}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-opacity duration-1000",
              activeIdx === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          />
        </div>

        {/* Cinematic Overlays to improve text contrast and blending */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808]/15 to-[#080808]/80 z-20" />
      </Layer>

      {/* Layer 1 — Noise texture overlay */}
      <Layer depth={1} type="background" speed={0.2}>
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
        <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-container mx-auto pt-20">
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
        </div>
      </Layer>

      {/* Layer 4 — Floating badges */}
      <Layer depth={4} type="floating" mouseReactive className="hidden md:block">
        <div className="absolute top-[25%] right-[12%] float-gentle">
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-sm">
            <span className="text-accent font-mono font-bold">+340%</span>
            <span className="text-muted ml-2">ROI promedio</span>
          </div>
        </div>
        <div className="absolute bottom-[30%] right-[8%] float-gentle-delayed">
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-sm">
            <span className="text-accent font-mono font-bold">200+</span>
            <span className="text-muted ml-2">clientes</span>
          </div>
        </div>
      </Layer>

      {/* Layer 5 — FX (Neutral Glow) */}
      <Layer depth={5} type="fx" mouseReactive>
        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-white/[0.01] blur-[120px]" />
      </Layer>

      <ScrollCue />
    </ParallaxSection>
  )
}
