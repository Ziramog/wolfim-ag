"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"

interface LeadNotif {
  name: string
  city: string
  service: string
  time: string
}

const NOTIFICATION_POOL: LeadNotif[] = [
  { id: 1, name: "Restaurante El Fogón", city: "Córdoba", service: "Google Ads", time: "hace 2 min" },
  { id: 2, name: "Clínica DermaLife", city: "Buenos Aires", service: "SEO", time: "hace 5 min" },
  { id: 3, name: "FerreMax", city: "Rosario", service: "Web + SEO", time: "hace 8 min" },
  { id: 4, name: "Estudio Contable PMR", city: "Mendoza", service: "Landing Page", time: "hace 12 min" },
  { id: 5, name: "Auto Spa Premium", city: "La Plata", service: "Google Ads", time: "hace 15 min" },
  { id: 6, name: "Óptica Visual", city: "Tucumán", service: "SEO + Ads", time: "hace 18 min" },
  { id: 7, name: "Farmacia del Centro", city: "Santa Fe", service: "WhatsApp Bot", time: "hace 22 min" },
  { id: 8, name: "Inmobiliaria Norte", city: "Salta", service: "Web + Ads", time: "hace 25 min" },
  { id: 9, name: "Pet Shop Huellitas", city: "Mar del Plata", service: "Redes Sociales", time: "hace 28 min" },
  { id: 10, name: "Gym FitZone", city: "Neuquén", service: "Landing + Ads", time: "hace 32 min" },
  { id: 11, name: "Consultora RH Plus", city: "CABA", service: "SEO", time: "hace 35 min" },
  { id: 12, name: "Panadería La Abuela", city: "Córdoba", service: "Google Ads", time: "hace 38 min" },
  { id: 13, name: "Taller Mecánico JR", city: "Bahía Blanca", service: "Web", time: "hace 41 min" },
  { id: 14, name: "Centro Odontológico", city: "Resistencia", service: "SEO + Web", time: "hace 45 min" },
  { id: 15, name: "Kiosco Digital", city: "Paraná", service: "E-commerce", time: "hace 48 min" },
]

const serviceColors: Record<string, string> = {
  "Google Ads": "text-accent-warm",
  SEO: "text-accent",
  Web: "text-blue-400",
  "Web + SEO": "text-accent",
  "Web + Ads": "text-accent-warm",
  "SEO + Ads": "text-accent",
  "Landing Page": "text-blue-400",
  "Landing + Ads": "text-accent-warm",
  "WhatsApp Bot": "text-green-400",
  "SEO + Web": "text-accent",
  "Redes Sociales": "text-purple-400",
  "E-commerce": "text-cyan-400",
}

interface LeadNotif {
  id: number
  name: string
  city: string
  service: string
  time: string
}

export function LiveFeed() {
  const [queue, setQueue] = useState<LeadNotif[]>([])

  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      setQueue([NOTIFICATION_POOL[0]])
    }, 1500)

    const interval = setInterval(() => {
      // Pick a random notification and give it a unique instance ID for the queue
      const baseNotif =
        NOTIFICATION_POOL[Math.floor(Math.random() * NOTIFICATION_POOL.length)]
      const notif = { ...baseNotif, queueId: Math.random() } // Unique stable key for this instance
      
      setQueue((prev) => [notif as any, ...prev].slice(0, 5))
    }, 3200)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="relative py-section-pad-y overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--color-bg) 0%, #0a0a0a 50%, var(--color-bg) 100%)",
      }}
    >
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <FadeIn>
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mb-4">
                Mientras leés esto, otros negocios ya están{" "}
                <span className="text-accent">recibiendo clientes.</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                Cada minuto que pasa sin un sistema de captación es un cliente que se fue con tu competencia.
                No esperes más para activar tu crecimiento.
              </p>
            </div>
          </FadeIn>

          {/* Right — Live notification feed */}
          <div className="relative">
            <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 h-[400px] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  Consultas en vivo
                </span>
              </div>

              {/* Notifications */}
              <div className="space-y-2 overflow-hidden flex-1 relative">
                <AnimatePresence initial={false} mode="popLayout">
                  {queue.map((notif: any) => (
                    <motion.div
                      key={notif.queueId}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] h-[64px]"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs flex-shrink-0">
                        🔔
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text truncate font-medium">
                          {notif.name}
                        </p>
                        <p className="text-xs text-muted">
                          {notif.city} ·{" "}
                          <span className={serviceColors[notif.service] || "text-accent"}>
                            {notif.service}
                          </span>
                        </p>
                      </div>
                      <span className="text-[10px] text-muted/60 flex-shrink-0">
                        {notif.time}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -bottom-8 -right-8 w-[200px] h-[200px] rounded-full bg-accent/[0.04] blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
