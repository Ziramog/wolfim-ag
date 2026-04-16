import { ImageResponse } from "next/og"
import { getNicheHeadline } from "@/lib/config/niches"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const niche = searchParams.get("niche") ?? "default"
  const headline = getNicheHeadline(niche)

  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#c8ff00",
            fontFamily: "serif",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          WOLFIM
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#f5f5f5",
            fontFamily: "sans-serif",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            color: "#6b6b6b",
            fontFamily: "sans-serif",
          }}
        >
          Web · SEO · Ads · WhatsApp
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
