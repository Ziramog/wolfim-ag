"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import type { CTAData } from "@/lib/config/site"

export function CTA({ headline, subheadline, ctaLabel }: CTAData) {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [business, setBusiness] = useState("")
  
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const handleSubmit = async () => {
    if (!name || !whatsapp) return
    setFormState("loading")

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, business }),
      })
      setFormState("success")
    } catch {
      setFormState("idle")
    }
  }

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center bg-bg overflow-hidden border-b border-white/10" id="cta">
      
      <div className="bg-grid opacity-50" />

      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full border border-white/[0.03] flex items-center justify-center">
        <div className="w-[60%] h-[60%] rounded-full border border-white/[0.05]" />
      </div>

      <div className="max-w-container mx-auto px-6 md:px-12 py-32 w-full relative z-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          <motion.div style={{ y }} className="w-full">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="section-label text-accent">INITIATE_SEQUENCE</span>
              <span className="w-8 h-[1px] bg-accent" />
            </div>

            <h2 className="display-xl text-text leading-[0.85] mb-6 text-center uppercase tracking-tighter">
              {headline}
            </h2>

            <p className="text-subhead max-w-lg mx-auto text-center mb-16">
              {subheadline}
            </p>

            <AnimatePresence mode="wait">
              {formState !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="bg-bg border border-white/10 p-8 md:p-12 relative group"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Input
                      label="Nombre"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      label="WhatsApp"
                      placeholder="+54 9 351..."
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                    <Input
                      label="Rubro"
                      placeholder="Ej: E-commerce"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="xl"
                    className="w-full"
                    magnetic
                    loading={formState === "loading"}
                    onClick={handleSubmit}
                  >
                    {ctaLabel}
                  </Button>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-mono text-muted uppercase tracking-wider">
                      STATUS: WAITING_INPUT
                    </p>
                    <a
                      href="/servicios#pricing"
                      className="text-xs font-mono text-accent hover:text-white transition-colors flex items-center gap-2 uppercase tracking-wider"
                    >
                      <span>Ver planes</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="bg-bg border border-accent p-12 text-center relative"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent" />

                  <div className="w-16 h-16 mx-auto mb-8 border border-accent flex items-center justify-center text-accent animate-pulse">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  
                  <h3 className="font-display text-3xl text-text mb-4 uppercase tracking-tight">
                    PROTOCOLO ACTIVADO
                  </h3>
                  <p className="font-mono text-sm text-muted">
                    Información recibida. Iniciando contacto en T-24H.
                    <br />
                    <span className="text-accent mt-2 block">STANDBY FOR TRANSMISSION.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
