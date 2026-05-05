"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.06]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-container mx-auto px-6 md:px-12 py-section-pad-y">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <img
            src="/wolfim studio white-Photoroom.png"
            alt="WOLFIM"
            className="h-[5.1rem] md:h-[6.6rem] w-auto object-contain"
          />
        </motion.div>

        {/* Top section — contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 mb-16"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Contacto</span>
          <a
            href="mailto:hello@wolfim.com"
            className="text-xl md:text-2xl font-display text-white hover:text-[#c4ff00] transition-colors tracking-tight"
          >
            hello@wolfim.com
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-px bg-white/[0.06] mb-10"
        />

        {/* Bottom section — legal + location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[11px] text-white/25 font-mono">
            © {currentYear} WOLFIM — Córdoba, Argentina
          </p>
          <div className="flex items-center gap-1 text-[11px] text-white/25 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4ff00]/40" />
            <span>Trabajando en潜 — Worldwide</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
