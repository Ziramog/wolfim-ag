"use client"

import { FadeIn } from "@/components/motion/FadeIn"
import { Badge } from "@/components/ui/Badge"
import type { ServiceData } from "@/lib/config/site"

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  return (
    <FadeIn delay={index * 0.15}>
      <div className="group relative p-6 md:p-8 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-500">
        {/* Accent glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <span className="text-4xl mb-4 block">{service.icon}</span>
          <h3 className="text-xl md:text-2xl font-semibold text-text mb-3">
            {service.label}
          </h3>
          <p className="text-muted leading-relaxed mb-6">{service.description}</p>

          <ul className="space-y-2">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                <span className="text-text/80">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
      className="relative py-section-pad-y"
      style={{
        background: "linear-gradient(180deg, var(--color-bg) 0%, #0d0d0d 50%, var(--color-bg) 100%)",
      }}
    >
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <Badge variant="accent" className="mb-4">
            Sistema integrado
          </Badge>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-muted text-lg max-w-2xl mb-12 md:mb-16">
            No vendemos servicios sueltos. Diseñamos un sistema completo donde cada pieza potencia a la otra.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
