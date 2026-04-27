import { notFound } from "next/navigation"
import { SmoothScroller } from "@/components/layout/SmoothScroller"
import { CursorFollower } from "@/components/layout/CursorFollower"
import { StickyNav } from "@/components/layout/StickyNav"
import { Hero } from "@/components/sections/Hero/Hero"
import { Problem } from "@/components/sections/Problem/Problem"
import { Solution } from "@/components/sections/Solution/Solution"
import { Proof } from "@/components/sections/Proof/Proof"
import { CaseShowcase } from "@/components/sections/CaseShowcase/CaseShowcase"
import { LiveFeed } from "@/components/sections/LiveFeed/LiveFeed"
import { Portfolio } from "@/components/sections/Portfolio/Portfolio"
import { CTA } from "@/components/sections/CTA/CTA"
import { Footer } from "@/components/layout/Footer"
import { SITE_CONFIG } from "@/lib/config/site"

export default function HomePage() {
  const config = SITE_CONFIG

  return (
    <SmoothScroller>
      <CursorFollower />
      <StickyNav />
      <Hero {...config.hero} />
      <Problem {...config.problem} />
      <Solution {...config.solution} />
      <Proof {...config.proof} />
      <CaseShowcase {...config.caseShowcase} />
      <LiveFeed />
      <Portfolio />
      <CTA {...config.cta} />
      <Footer />
    </SmoothScroller>
  )
}