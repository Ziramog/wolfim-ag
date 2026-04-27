"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { Badge } from "@/components/ui/Badge"
import type { ServiceData } from "@/lib/config/site"

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="group relative p-8 md:p-10 border-b border-border hover:border-accent/30 transition-colors duration-500"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-display text-text mb-4">
              {service.label}
            </h3>
            <ul className="space-y-2">
              {service.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
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
          <div className="flex-shrink-0 text-accent/40 group-hover:text-accent/70 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-16 md:mb-20">
            {headline}
          </h2>
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