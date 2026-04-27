"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ParallaxSection } from "@/components/motion/ParallaxSection"
import { Layer } from "@/components/motion/Layer"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import type { CTAData } from "@/lib/config/site"

export function CTA({ headline, subheadline, ctaLabel }: CTAData) {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [business, setBusiness] = useState("")

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
    <ParallaxSection className="min-h-screen flex items-center" id="cta">
      {/* Layer 0 — Gradient mesh background */}
      <Layer depth={0} type="background">
        <div className="absolute inset-0 gradient-mesh" />
      </Layer>

      {/* Layer 5 — FX glow */}
      <Layer depth={5} type="fx" mouseReactive>
        <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.08] blur-[150px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-accent-warm/[0.06] blur-[120px]" />
      </Layer>

      {/* Layer 3 — Content */}
      <Layer depth={3} type="content">
        <div className="max-w-container mx-auto px-6 md:px-12 py-section-pad-y w-full">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="font-display text-[clamp(2rem,5vw,4rem)] leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              {headline}
            </motion.h2>

            <motion.p
              className="text-muted text-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {subheadline}
            </motion.p>

            <AnimatePresence mode="wait">
              {formState !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-surface/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                      placeholder="Ej: Clínica dental"
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

                  <p className="text-xs text-muted/50 mt-4">
                    Sin compromisos · Sin letra chica · Respuesta en menos de 24hs
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="bg-surface/80 backdrop-blur-xl border border-accent/20 p-8 md:p-12"
                >
                  <div className="w-12 h-12 mb-6 text-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display text-text mb-2">
                    ¡Recibimos tu consulta!
                  </h3>
                  <p className="text-muted">
                    Te contactamos en menos de 24 hs por WhatsApp.
                    <br />
                    <span className="text-accent">Preparate para crecer.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Layer>
    </ParallaxSection>
  )
}
