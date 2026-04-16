import { SITE_CONFIG, type SiteConfig } from "./site"

export const validNiches = ["clinicas", "restaurantes", "agencias", "ecommerce"]

// Provide a default or extended config per niche
export function getNicheConfig(niche: string): SiteConfig | null {
  if (!validNiches.includes(niche)) return null

  // For now, we return the base config with slightly modified hero headlines
  // In a real implementation this would deep merge niche-specific copy
  const config = { ...SITE_CONFIG }

  switch (niche) {
    case "clinicas":
      config.hero = {
        ...config.hero,
        headline: "Tu clínica merece pacientes reales.",
        subheadline: "Diseñamos el ecosistema completo de captación de pacientes: web de autoridad, SEO local y automatización de turnos inteligente.",
      }
      break
    case "restaurantes":
      config.hero = {
        ...config.hero,
        headline: "Tu restaurante merece reservas reales.",
        subheadline: "Implementamos sistemas de reserva automática y estrategias de visibilidad que llenan tus mesas todos los días.",
      }
      break
    case "agencias":
      config.hero = {
        ...config.hero,
        headline: "Tu agencia merece clientes B2B de élite.",
        subheadline: "Escala tu captación con una web de alta conversión y embudos de prospección automatizados de primer nivel.",
      }
      break
    case "ecommerce":
      config.hero = {
        ...config.hero,
        headline: "Tu tienda online merece ventas, no solo visitas.",
        subheadline: "Optimizamos tu conversión y retorno de inversión con una infraestructura digital diseñada para vender más, más rápido.",
      }
      break
  }

  return config
}

export function getNicheHeadline(niche: string): string {
  const config = getNicheConfig(niche)
  return config ? config.hero.headline : SITE_CONFIG.hero.headline
}
