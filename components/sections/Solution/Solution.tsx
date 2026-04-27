"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { Badge } from "@/components/ui/Badge"
import type { ServiceData } from "@/lib/config/site"

// SVG icons — editorial, no emoji
const icons = {
  web: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  seo: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  ads: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  automation: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
}

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  return (
    <FadeIn delay={index * 0.12}>
      <motion.div
        className="group relative p-8 md:p-10 border-b border-border hover:border-accent/30 transition-colors duration-500"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 text-text/40 group-hover:text-accent transition-colors duration-300 mt-1">
            {icons[service.id as keyof typeof icons]}
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-display text-text mb-2">
              {service.label}
            </h3>
            <p className="text-muted leading-relaxed mb-6">{service.description}</p>

            <ul className="space-y-3">
              {service.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text/70">
                  <span className="text-accent mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  )
}

interface SolutionProps {
  headline: string
  services: ServiceData[]
}

export function Solution({ headline, services }: SolutionProps) {
  return (
    <section
      id="solution"
      className="relative py-section-pad-y bg-bg"
    >
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <Badge variant="accent" className="mb-6">
            Sistema Integrado
          </Badge>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-muted text-lg max-w-2xl mb-16 md:mb-20">
            No vendemos servicios sueltos. Diseñamos un sistema donde cada pieza potencia a la otra.
          </p>
        </FadeIn>

        <div className="border-t border-border">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}