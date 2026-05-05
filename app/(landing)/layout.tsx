import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/config/site"
import { ScrollProgress } from "@/components/layout/ScrollProgress"
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating"

export const metadata: Metadata = {
  title: `${SITE_CONFIG.hero.headline} | WOLFIM`,
  description: SITE_CONFIG.hero.subheadline,
  keywords: ["agencia de marketing", "diseño web profesional", "SEO Argentina", "Google Ads"],
  openGraph: {
    title: `WOLFIM — ${SITE_CONFIG.hero.headline}`,
    description: SITE_CONFIG.hero.subheadline,
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    locale: "es_AR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://wolfim.com" },
  robots: { index: true, follow: true },
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgress />
      <WhatsAppFloating />
      {children}
    </>
  )
}
