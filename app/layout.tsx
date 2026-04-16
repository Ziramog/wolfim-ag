import type { Metadata } from "next"
import { PT_Serif, Inter, JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import "@/styles/animations.css"

const fontDisplay = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
})

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wolfim.com"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "WOLFIM",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://wolfim.com",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
              description:
                "Agencia de adquisición de clientes: web, SEO, Google Ads, WhatsApp",
              areaServed: "AR",
              serviceType: [
                "Web Design",
                "SEO",
                "Digital Advertising",
                "Marketing Automation",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "48",
              },
            }),
          }}
        />
      </head>
      <body className="font-body bg-bg text-text antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
