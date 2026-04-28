import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CursorFollower } from "@/components/layout/CursorFollower"
import { StickyNav } from "@/components/layout/StickyNav"
import { Hero } from "@/components/sections/Hero/Hero"
import { Problem } from "@/components/sections/Problem/Problem"
import { Solution } from "@/components/sections/Solution/Solution"
import { Proof } from "@/components/sections/Proof/Proof"
import { LiveFeed } from "@/components/sections/LiveFeed/LiveFeed"
import { CTA } from "@/components/sections/CTA/CTA"
import { Footer } from "@/components/layout/Footer"
import { getNicheConfig, validNiches } from "@/lib/config/niches"

type Props = {
  params: { niche: string }
}

export function generateStaticParams() {
  return validNiches.map((niche) => ({ niche }))
}

export function generateMetadata({ params }: Props): Metadata {
  const nicheConfig = getNicheConfig(params.niche)
  if (!nicheConfig) return {}

  return {
    title: `${nicheConfig.hero.headline} | WOLFIM`,
    description: nicheConfig.hero.subheadline,
    openGraph: {
      title: `WOLFIM — ${nicheConfig.hero.headline}`,
      description: nicheConfig.hero.subheadline,
      images: [{ url: `/api/og?niche=${params.niche}`, width: 1200, height: 630 }],
    },
  }
}

export default function NichePage({ params }: Props) {
  const nicheConfig = getNicheConfig(params.niche)

  if (!nicheConfig) {
    notFound()
  }

  return (
    <>
      <CursorFollower />
      <StickyNav />
      <Hero {...nicheConfig.hero} />
      <Problem {...nicheConfig.problem} />
      <Solution {...nicheConfig.solution} />
      <Proof {...nicheConfig.proof} />
      <LiveFeed />
      <CTA {...nicheConfig.cta} />
      <Footer />
    </>
  )
}
