export interface HeroData {
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
  badge?: string
  priceTag?: string
}

export interface PainPoint {
  icon: string
  title: string
  description: string
}

export interface ServiceData {
  id: string
  label: string
  description: string
  outcomes: string[]
  accentColor: string
  icon: string
}

export interface MetricData {
  value: number
  suffix: string
  label: string
}

export interface TestimonialData {
  quote: string
  author: string
  company: string
  result: string
}

export interface PricingTier {
  name: string
  price: { monthly: number; annual: number }
  description: string
  features: string[]
  featured?: boolean
  ctaLabel: string
}

export interface CTAData {
  headline: string
  subheadline: string
  ctaLabel: string
}

export interface CaseShowcaseData {
  headline: string
  subheadline?: string
}

export interface SiteConfig {
  hero: HeroData
  problem: { headline: string; painPoints: PainPoint[] }
  solution: { headline: string; services: ServiceData[] }
  proof: { metrics: MetricData[]; testimonials: TestimonialData[] }
  caseShowcase: CaseShowcaseData
  pricing: { headline: string; tiers: PricingTier[] }
  cta: CTAData
}

export const SITE_CONFIG: SiteConfig = {
  hero: {
    headline: "Creamos Depredadores.",
    subheadline:
      "Diseños web inmersivos. Dominio SEO. Ads que convierten. WhatsApp en piloto automático. Hoy dejas de ser invisible.",
    ctaLabel: "Ver Planes desde $200",
    ctaHref: "/servicios#pricing",
    badge: "Diseño Web + SEO + Ads + Automatización",
    priceTag: "desde USD 200",
  },

  problem: {
    headline: "El problema es que no te encuentran.",
    painPoints: [
      {
        icon: "",
        title: "Tu web se ve igual que",
        description: "la de todos. Sin diferenciación. Sin identidad. Sin presencia real.",
      },
      {
        icon: "",
        title: "Tus competidores aparecen primero en",
        description: "Google. Si no eres primero, eres invisible para el 75% de tus prospects.",
      },
      {
        icon: "",
        title: "Tus leads se enfrían porque",
        description: "respondés tarde. 5 minutos de demora = 80% menos chance de cerrar.",
      },
      {
        icon: "",
        title: "No sos un depredador.",
        description: "Eres presa. Y tus competidores lo saben.",
      },
    ],
  },

  solution: {
    headline: "Cinco armas. Un arsenal depredador.",
    services: [
      {
        id: "web",
        label: "Diseño Web Inmersivo",
        description:
          "Websites full-bleed, con video y scroll-triggered que hacen que los visitantes dejen de scrollear y empiecen a comprar. No templates. Experiencias que convierten.",
        outcomes: [
          "Webs con video background",
          "Scroll cinematico",
          "Tasa conversión +180%",
        ],
        accentColor: "var(--color-accent)",
        icon: "",
      },
      {
        id: "seo",
        label: "Posicionamiento SEO",
        description:
          "SEO técnico, estrategia de contenido y construcción de autoridad que te pone arriba en los resultados. Si no eres primero, eres último.",
        outcomes: [
          "Auditoría técnica completa",
          "Contenido optimizado",
          "Top 3 Google",
        ],
        accentColor: "var(--color-accent)",
        icon: "",
      },
      {
        id: "ads",
        label: "Gestión de Google Ads",
        description:
          "Arquitectura de campañas data-driven que convierte gasto en revenue. Cada click trackeado. Cada dólar optimizado. Cero desperdicio.",
        outcomes: [
          "ROI 5x en 90 días",
          "CPL optimizado",
          "CPC reducido 60%",
        ],
        accentColor: "var(--color-accent-warm)",
        icon: "",
      },
      {
        id: "automation",
        label: "Automatización WhatsApp",
        description:
          "Calificación automática de leads, respuestas instantáneas y secuencias de nurture. Tu equipo de ventas nunca duerme. Tus leads nunca se enfrían.",
        outcomes: [
          "Respuesta en 2 segundos",
          "Lead scoring automático",
          "Cierre +200%",
        ],
        accentColor: "var(--color-accent)",
        icon: "",
      },
    ],
  },

  proof: {
    metrics: [
      { value: 340, suffix: "%", label: "ROI promedio en Ads" },
      { value: 200, suffix: "+", label: "Negocios transformados" },
      { value: 90, suffix: "días", label: "Para ver resultados" },
    ],
    testimonials: [
      {
        quote:
          "WOLFIM no solo rediseñó nuestra web — reconstruyó todo nuestro modelo de ingresos. Pasamos de invisibles a líderes del mercado en 6 meses.",
        author: "Martín Reyes",
        company: "CEO, Nexus Fitness",
        result: "+340% tráfico",
      },
      {
        quote:
          "Nuestros Google Ads estaban quemando plata. WOLFIM los convirtió en nuestro canal #1 de revenue. El ROI pasó de 0.8x a 5x en 90 días.",
        author: "Sofía Delgado",
        company: "Fundadora, Aura Beauty",
        result: "ROI 5x en Ads",
      },
      {
        quote:
          "Solo la automatización de WhatsApp pagó todo. Ahora respondemos en 2 segundos. Nuestra tasa de cierre se triplicó.",
        author: "Diego Martínez",
        company: "Director, Titan Industrial",
        result: "+200% cierre",
      },
    ],
  },

  caseShowcase: {
    headline: "Webs que venden.",
    subheadline: "Diseñadas para convertir. Construidas para durar.",
  },

  pricing: {
    headline: "Elegí tu arma.",
    tiers: [
      {
        name: "Wolf Pup",
        price: { monthly: 500, annual: 400 },
        description: "Para negocios listos para dejar de ser invisibles.",
        features: [
          "Landing page inmersiva",
          "SEO básico inicial",
          "Google Analytics",
          "30 días de soporte",
        ],
        ctaLabel: "Empezar",
      },
      {
        name: "Alpha Wolf",
        price: { monthly: 1200, annual: 960 },
        description: "El paquete depredador completo. El más elegido.",
        features: [
          "Website inmersivo completo",
          "SEO avanzado + Estrategia de contenido",
          "Gestión de Google Ads",
          "Automatización WhatsApp",
          "Dashboard de métricas",
          "90 días de soporte",
        ],
        featured: true,
        ctaLabel: "Elegir Alpha Wolf",
      },
      {
        name: "Wolf Pack",
        price: { monthly: 2500, annual: 2000 },
        description: "Dominio de mercado. Todo, amplificado.",
        features: [
          "Website premium + video",
          "Dominación SEO completa",
          "Ads multi-plataforma",
          "Automatización avanzada + CRM",
          "Account Manager dedicado",
          "6 meses de soporte prioritario",
        ],
        ctaLabel: "Hablemos",
      },
    ],
  },

  cta: {
    headline: "Dejá de ser invisible.",
    subheadline:
      "Tus competidores no esperan. Cada día que seguís invisible es un día que ellos ganan. Reservá tu diagnóstico gratuito — sin compromiso, solo estrategia.",
    ctaLabel: "Contactame",
  },
}
