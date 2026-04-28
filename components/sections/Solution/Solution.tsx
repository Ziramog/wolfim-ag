"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { Badge } from "@/components/ui/Badge"
import type { ServiceData } from "@/lib/config/site"

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="group py-10 border-b border-border last:border-b-0 hover:border-accent/30 transition-all duration-500"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h3 className="font-display text-2xl md:text-3xl text-text mb-3 group-hover:text-accent transition-colors">
              {service.label}
            </h3>
            <p className="text-sm text-muted mb-4 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.outcomes.map((outcome, i) => (
                <li key={i} className="text-sm text-muted flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
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
      className="relative py-section-pad-y bg-bg bg-grid"
    >
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <span className="overline block mb-4">Lo que hacemos</span>
          <h2 className="display-xl text-text mb-16 max-w-3xl">
            {headline}
          </h2>
        </FadeIn>

        <div className="max-w-3xl">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}