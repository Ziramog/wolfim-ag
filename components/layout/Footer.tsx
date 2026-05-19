"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-bg border-t border-white/10 overflow-hidden">
      <div className="bg-grid opacity-30" />
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full flex">
        <div className="h-[2px] bg-accent w-12" />
        <div className="h-[1px] bg-white/10 flex-1" />
      </div>

      <div className="max-w-container mx-auto px-6 md:px-12 py-16 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 border-2 border-accent flex items-center justify-center relative">
                <div className="w-2 h-2 bg-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter text-text">
                WOLFIM
              </span>
            </motion.div>
            
            <p className="text-sm font-mono text-muted uppercase tracking-wider max-w-sm">
              Ingeniería de crecimiento para operaciones B2B y E-commerce.
              Sistemas de alta precisión.
            </p>
          </div>

          {/* Contact Col */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-4 border-b border-white/10 pb-2">
              COM_LINK
            </span>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@wolfim.com" className="text-sm font-mono text-muted hover:text-white transition-colors">
                HELLO@WOLFIM.COM
              </a>
              <span className="text-sm font-mono text-muted">
                +54 9 351 123 4567
              </span>
            </div>
          </motion.div>

          {/* Social Col */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-4 border-b border-white/10 pb-2">
              NETWORKS
            </span>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm font-mono text-muted hover:text-white transition-colors">LINKEDIN</a>
              <a href="#" className="text-sm font-mono text-muted hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="text-sm font-mono text-muted hover:text-white transition-colors">GITHUB</a>
            </div>
          </motion.div>

        </div>

        {/* Technical Divider */}
        <div className="tech-divider mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest">
            © {currentYear} WOLFIM AG. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
            <span>LOC: CORDOBA, AR</span>
            <span className="w-1 h-1 bg-accent/50" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>SYSTEM: ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
