"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.06]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-container mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Brand — takes 2 cols */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="/" className="inline-block mb-6" data-cursor>
                <img
                  src="/images/mobile/logo.jpeg"
                  alt="WOLFIM"
                  className="h-[60px] w-auto object-contain mix-blend-screen"
                />
              </a>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Creamos depredadores. Experiencias digitales inmersivas que hacen que tu negocio sea imposible de ignorar.
              </p>
            </motion.div>
          </div>

          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">Servicios</h4>
            <ul className="space-y-3">
              {[
                "Diseño Web Inmersivo",
                "Posicionamiento SEO",
                "Gestión de Google Ads",
                "Automatización WhatsApp",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/50 hover:text-accent transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5491173858454"
                  className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2"
                >
                  WhatsApp
                  <span className="text-[10px] bg-accent/10 px-1.5 py-0.5 rounded text-accent">24/7</span>
                </a>
              </li>
              <li>
                <a href="mailto:hola@wolfim.com" className="text-sm text-white/50 hover:text-accent transition-colors">
                  hola@wolfim.com
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 text-center"
        >
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-4">
            Listo para cazar?
          </p>
          <a
            href="/servicios"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-semibold text-sm rounded-full hover:bg-accent/90 transition-all hover:gap-4"
          >
            Ver servicios
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/25 font-mono uppercase tracking-wider">
            © {currentYear} WOLFIM — Córdoba, Argentina
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-widest font-mono">
              Privacidad
            </a>
            <a href="#" className="text-[10px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-widest font-mono">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
