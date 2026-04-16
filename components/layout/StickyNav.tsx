"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export function StickyNav() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08])

  return (
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
        <a href="/" className="flex items-center gap-2 group" data-cursor>
          <img 
            src="/images/desktop/wolfim_logo_header.jpeg" 
            alt="WOLFIM" 
            className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80" 
          />
        </a>

        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Servicios", href: "#solution" },
            { label: "Resultados", href: "#proof" },
            { label: "Planes", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-text transition-colors duration-200"
              data-cursor
            >
              {link.label}
            </a>
          ))}

          <a
            href="#cta"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-black text-sm font-semibold hover:scale-[1.03] transition-transform"
            data-cursor
          >
            Consultá gratis
          </a>
        </div>

        {/* Mobile menu button */}
        <button
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
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </motion.nav>
  )
}
