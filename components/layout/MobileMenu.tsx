"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: "Inicio", href: "#hero" },
  { label: "El Problema", href: "#problem" },
  { label: "Servicios", href: "#solution" },
  { label: "Resultados", href: "#proof" },
  { label: "Casos", href: "#cases" },
  { label: "Precios", href: "#pricing" },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent backdrop — shows hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[199] bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Floating glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed inset-[10px] z-[200]",
              "bg-black/50 backdrop-blur-3xl",
              "border border-white/[0.08]"
            )}
          >
            {/* Close button */}
            <div className="absolute top-5 right-5">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Menu content */}
            <nav className="px-10 pt-16 pb-12">
              <ul className="space-y-1">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{
                      duration: 0.5,
                      delay: isMounted ? 0.1 + i * 0.07 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "block py-4 text-2xl md:text-3xl font-display",
                        "text-white/70 hover:text-white",
                        "transition-colors duration-300",
                        "border-b border-white/[0.06] last:border-b-0"
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: isMounted ? 0.1 + menuItems.length * 0.07 + 0.05 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8"
              >
                <a
                  href="#cta"
                  onClick={handleLinkClick}
                  className={cn(
                    "inline-flex items-center gap-3",
                    "px-6 py-3 rounded-full",
                    "bg-accent text-black font-semibold text-sm",
                    "hover:bg-accent/90 transition-all"
                  )}
                >
                  Empezá a Cazar
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: isMounted ? 0.1 + menuItems.length * 0.07 + 0.1 : 0,
                }}
                className="mt-8 text-xs text-white/30 font-mono tracking-widest"
              >
                WOLFIM — CREAMOS DEPREDADORES
              </motion.p>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
