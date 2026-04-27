export interface HeroData {
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
  badge?: string
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

export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  href: string
  tags: string[]
}

export interface CaseShowcaseData {
  headline: string
  subheadline?: string
}

export interface PortfolioData {
  headline: string
  items: PortfolioItem[]
}

export interface SiteConfig {
  hero: HeroData
  problem: { headline: string; painPoints: PainPoint[] }
  solution: { headline: string; services: ServiceData[] }
  proof: { metrics: MetricData[]; testimonials: TestimonialData[] }
  caseShowcase: CaseShowcaseData
  portfolio: PortfolioData
  pricing: { headline: string; tiers: PricingTier[] }
  cta: CTAData
}

export const SITE_CONFIG: SiteConfig = {
  hero: {
    headline: "Tu empresa merece clientes reales.",
    subheadline:
      "Diseñamos el sistema completo de captación para empresas de élite: web cinematográfica, SEO avanzado, Google Ads y automatización inteligente.",
    ctaLabel: "Quiero resultados ahora",
    ctaHref: "#cta",
    badge: "Ingeniería de crecimiento digital",
  },

  problem: {
    headline: "¿Tu negocio está estancado o escalando?",
    painPoints: [
      {
        icon: "",
        title: "Marketing sin retorno",
        description: "Campañas que no convierten. Si no hay datos, hay apuesta.",
      },
      {
        icon: "",
        title: "Tu web no vende",
        description: "Bonito no es suficiente. Si no convierte, es gasto.",
      },
      {
        icon: "",
        title: "Tu competencia avanza",
        description: "Mientras dudás, otros captan a tus clientes.",
      },
      {
        icon: "",
        title: "Leads que se enfrían",
        description: "5 minutos de espera = 80% menos conversión.",
      },
    ],
  },

  solution: {
    headline: "Tu ecosistema de crecimiento",
    services: [
      {
        id: "web",
        label: "Websites de Autoridad",
        description: "",
        outcomes: [
          "LCP < 1.2s",
          "Diseño cinematográfico",
          "Mobile-first",
        ],
        accentColor: "var(--color-accent)",
        icon: "",
      },
      {
        id: "seo",
        label: "SEO de Dominio",
        description: "",
        outcomes: [
          "Auditoría técnica",
          "Contenido optimizado",
          "Link building",
        ],
        accentColor: "var(--color-accent)",
        icon: "",
      },
      {
        id: "ads",
        label: "Ads de Alto Rendimiento",
        description: "",
        outcomes: [
          "+340% ROI",
          "CPL optimizado",
          "Audiencias segmentadas",
        ],
        accentColor: "var(--color-accent-warm)",
        icon: "",
      },
      {
        id: "automation",
        label: "Automatización de Conversión",
        description: "",
        outcomes: [
          "Respuesta < 5 seg",
          "Lead scoring",
          "CRM integrado",
        ],
        accentColor: "var(--color-accent)",
        icon: "",
      },
    ],
  },

  proof: {
    metrics: [
      { value: 200, suffix: "+", label: "Clientes activos" },
      { value: 340, suffix: "%", label: "ROI promedio en Ads" },
      { value: 48, suffix: "h", label: "Entrega inicial" },
    ],
    testimonials: [
      {
        quote:
          "En 90 días triplicamos las consultas. El enfoque de ingeniería convierte como nada que hayamos probado.",
        author: "Martín Rodríguez",
        company: "Clínica DermaLife",
        result: "+280% consultas",
      },
      {
        quote:
          "La automatización de WhatsApp redujo nuestro tiempo de respuesta de horas a segundos.",
        author: "Laura Méndez",
        company: "Restaurante El Fogón",
        result: "+45% reservas",
      },
      {
        quote:
          "Pasamos de la invisibilidad a dominar los primeros resultados de Google.",
        author: "Carlos Pereyra",
        company: "FerreMax",
        result: "Top 3 Google",
      },
    ],
  },

  caseShowcase: {
    headline: "Webs que venden.",
    subheadline: "Diseñadas para convertir. Construidas para durar.",
  },

  portfolio: {
    headline: "Casos de Éxito",
    items: [
      {
        id: "construvial",
        title: "Construvial",
        category: "Infraestructura & Vialidad",
        description: "Transformación digital para gigantes de la ingeniería civil. Optimizamos su presencia para reflejar 35 años de solidez.",
        image: "/images/portfolio/construvial.png",
        href: "https://construvial.vercel.app",
        tags: ["Next.js", "SEO Industrial", "Estrategia de Marca"]
      },
      {
        id: "korantis",
        title: "Korantis",
        category: "Sistemas & Inteligencia",
        description: "Diseño de ecosistemas operativos de alta escala. Traducimos procesos complejos en interfaces de autoridad técnica.",
        image: "/images/portfolio/korantis.png",
        href: "https://korantis.vercel.app",
        tags: ["SaaS Architecture", "User Experience", "Scale Ops"]
      }
    ]
  },

  pricing: {
    headline: "Planes diseñados para escalar",
    tiers: [
      {
        name: "Starter",
        price: { monthly: 500, annual: 400 },
        description: "Fundación digital de alta autoridad",
        features: [
          "Landing page cinematográfica",
          "SEO técnico on-page inicial",
          "Google Analytics + Seguimiento de leads",
          "Soporte profesional por email",
        ],
        ctaLabel: "Iniciar ahora",
      },
      {
        name: "Crecimiento",
        price: { monthly: 1200, annual: 960 },
        description: "Motor completo de captación",
        features: [
          "Todo lo incluido en Starter",
          "SEO avanzado + Estrategia de contenido",
          "Gestión experta de Google Ads",
          "Sistema de respuesta automatizada",
          "Dashboard de métricas en tiempo real",
          "Soporte técnico prioritario",
        ],
        featured: true,
        ctaLabel: "Elegir Crecimiento",
      },
      {
        name: "Scale",
        price: { monthly: 2500, annual: 2000 },
        description: "Dominio de mercado + Automatización Total",
        features: [
          "Todo lo incluido en Crecimiento",
          "Automatización de flujo de ventas avanzada",
          "A/B testing y optimización continua",
          "Gestión de canales múltiples (Ads + Social)",
          "Integración profunda con CRM",
          "Account Manager dedicado",
          "Reportes estratégicos semanales",
        ],
        ctaLabel: "Hablemos de escala",
      },
    ],
  },

  cta: {
    headline: "Tu próximo gran salto comienza aquí.",
    subheadline:
      "Reserva tu diagnóstico gratuito ahora. Respuesta garantizada en menos de 24 horas. Sin compromisos, solo estrategia.",
    ctaLabel: "Obtener mi diagnóstico gratis",
  },
}
