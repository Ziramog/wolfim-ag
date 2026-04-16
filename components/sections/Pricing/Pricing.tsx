"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import type { PricingTier } from "@/lib/config/site"

function PricingCard({ tier, billingPeriod }: { tier: PricingTier; billingPeriod: "monthly" | "annual" }) {
  const price = billingPeriod === "monthly" ? tier.price.monthly : tier.price.annual

  return (
    <div
      className={cn(
        "relative p-6 md:p-8 rounded-2xl border transition-all duration-500",
        tier.featured
          ? "bg-surface border-accent/20 scale-[1.02] md:scale-105 glow-pulse z-10"
          : "bg-surface border-border hover:border-white/15"
      )}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent text-black text-xs font-bold px-4 py-1 rounded-full">
            Recomendado
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-text mb-1">{tier.name}</h3>
        <p className="text-sm text-muted">{tier.description}</p>
      </div>

      <div className="mb-6 min-h-[84px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={price}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-sm text-muted">USD</span>
            <span className="text-4xl font-display text-text">${price}</span>
            <span className="text-sm text-muted">/mes</span>
          </motion.div>
        </AnimatePresence>
        <div className="h-4">
          {billingPeriod === "annual" && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-accent mt-1"
            >
              Ahorrás 20% anual
            </motion.p>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
            <span className="text-text/80">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier.featured ? "primary" : "outline"}
        size="lg"
        className="w-full"
        magnetic={tier.featured}
      >
        {tier.ctaLabel}
      </Button>
    </div>
  )
}

interface PricingProps {
  headline: string
  tiers: PricingTier[]
}

export function Pricing({ headline, tiers }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  return (
    <section id="pricing" className="relative py-section-pad-y bg-bg">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-6">
              {headline}
            </h2>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-surface border border-border">
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "monthly"
                    ? "bg-accent text-black"
                    : "text-muted hover:text-text"
                )}
                onClick={() => setBillingPeriod("monthly")}
              >
                Mensual
              </button>
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "annual"
                    ? "bg-accent text-black"
                    : "text-muted hover:text-text"
                )}
                onClick={() => setBillingPeriod("annual")}
              >
                Anual
                <span className="ml-1 text-xs opacity-70">-20%</span>
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.12}>
              <PricingCard tier={tier} billingPeriod={billingPeriod} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="text-center text-sm text-muted mt-8">
            Todos los planes incluyen garantía:{" "}
            <span className="text-accent font-medium">
              2X tu inversión en leads o te devolvemos el fee.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
