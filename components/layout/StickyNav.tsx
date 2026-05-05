"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"
import { MobileMenu } from "@/components/layout/MobileMenu"

export function StickyNav() {
  const { scrollY } = useScroll()
  const [isReveal, setIsReveal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08])

  useEffect(() => {
    const handleNarrative = (e: any) => setIsReveal(e.detail.isReveal)
    window.addEventListener("wolfimNarrativeState" as any, handleNarrative)

    const unsubs = scrollY.on("change", (v) => setIsScrolled(v > 100))

    return () => {
      window.removeEventListener("wolfimNarrativeState" as any, handleNarrative)
      unsubs()
    }
  }, [scrollY])

  const showLogo = isReveal || isScrolled

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-6 py-4"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(8, 8, 8, ${v * 0.95})`
          ),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(255, 255, 255, ${v})`
          ),
          backdropFilter: useTransform(
            bgOpacity,
            (v) => `blur(${v * 16}px)`
          ),
        }}
      >
        <div className="max-w-container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center min-w-[120px]">
            <AnimatePresence>
              {showLogo && (
                <motion.a
                  href="/"
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2 group"
                  data-cursor
                >
                  <img
                  src="/wolfim studio white-Photoroom.png"
                    alt="WOLFIM"
                    className="h-[1.7rem] md:h-[2.2rem] w-auto object-contain transition-opacity group-hover:opacity-80 mix-blend-screen"
                  />
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Páginas Web", href: "/servicios#pricing" },
              { label: "Posicionamiento Google", href: "/servicios#pricing" },
              { label: "Mantenimiento", href: "/servicios#mantenimiento" },
              { label: "WhatsApp Automation", href: "/servicios" },
            ].map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors duration-200"
                data-cursor
              >
                {link.label}
              </a>
            ))}

            <a
              href="https://wa.me/5491173858454"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-all"
              data-cursor
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-text p-2"
            aria-label="Abrir menú"
            data-cursor
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
