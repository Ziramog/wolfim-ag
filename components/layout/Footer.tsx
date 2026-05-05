"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.06]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-container mx-auto px-6 md:px-12 py-16">
        {/* Minimalist single line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <p className="text-white/30 text-sm font-mono">
            hello@wolfim.com
          </p>
          <p className="text-[10px] text-white/25 font-mono uppercase tracking-wider">
            © {currentYear} WOLFIM — Córdoba, Argentina
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
