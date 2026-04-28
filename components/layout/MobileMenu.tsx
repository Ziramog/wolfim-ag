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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 z-[200] flex flex-col justify-end",
            // Glass black background
            "bg-black/80",
            "backdrop-blur-xl",
            "border-t border-white/[0.08]"
          )}
        >
          {/* Close button */}
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Cerrar menú"
            >
              <svg
                width="20"
                height="20"
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

          {/* Menu items */}
          <nav className="px-6 pb-[15vh] pt-24">
            <ul className="space-y-2">
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{
                    duration: 0.6,
                    delay: isMounted ? 0.05 + i * 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-4 text-4xl md:text-5xl font-display",
                      "text-white/80 hover:text-white",
                      "transition-colors duration-300",
                      "border-b border-white/[0.05] last:border-b-0"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: isMounted ? 0.05 + menuItems.length * 0.08 + 0.1 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12"
            >
              <a
                href="#cta"
                onClick={handleLinkClick}
                className={cn(
                  "inline-flex items-center gap-3",
                  "px-8 py-4 rounded-full",
                  "bg-accent text-black font-semibold text-lg",
                  "hover:bg-accent/90 transition-all"
                )}
              >
                Empezá a Cazar
                <svg
                  width="20"
                  height="20"
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
                duration: 0.6,
                delay: isMounted ? 0.05 + menuItems.length * 0.08 + 0.2 : 0,
              }}
              className="mt-12 text-sm text-white/30 font-mono tracking-wider"
            >
              WOLFIM — CREAMOS DEPREDADORES
            </motion.p>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
