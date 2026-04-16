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

export interface SiteConfig {
  hero: HeroData
  problem: { headline: string; painPoints: PainPoint[] }
  solution: { headline: string; services: ServiceData[] }
  proof: { metrics: MetricData[]; testimonials: TestimonialData[] }
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
        icon: "💸",
        title: "¿Sientes que arrojas dinero a un pozo sin fondo?",
        description:
          "Campañas que no convierten y presupuestos que se evaporan. Si no tienes datos claros, no tienes una estrategia, tienes una apuesta.",
      },
      {
        icon: "🌐",
        title: "Tu web es un adorno, no una herramienta",
        description:
          "Un sitio bonito no es suficiente. Si no convierte visitantes en consultas reales, es un gasto innecesario, no una inversión.",
      },
      {
        icon: "📉",
        title: "Tu competencia está ganando tu terreno",
        description:
          "Mientras tú dudas, otros negocios están captando a los clientes que deberían ser tuyos. La inacción es el mayor costo de oportunidad.",
      },
      {
        icon: "🤖",
        title: "Fugas de ventas por respuesta lenta",
        description:
          "Un prospecto que espera más de 5 minutos pierde el 80% de probabilidad de compra. Estás perdiendo dinero en cada minuto de silencio.",
      },
    ],
  },

  solution: {
    headline: "Tu ecosistema de crecimiento",
    services: [
      {
        id: "web",
        label: "Websites de Autoridad",
        description:
          "Sitios diseñados para persuadir y convertir. Estética premium, performance perfecta y optimización total para motores de búsqueda.",
        outcomes: [
          "LCP < 1.2s — velocidad top mundial para que tus clientes no esperen ni se vayan",
          "Diseño cinematográfico que genera confianza inmediata",
          "Arquitectura mobile-first de alta conversión",
          "Formularios inteligentes con filtrado de leads",
        ],
        accentColor: "var(--color-accent)",
        icon: "🖥️",
      },
      {
        id: "seo",
        label: "SEO de Dominio",
        description:
          "Posicionamiento orgánico mediante ingeniería de contenido. Resultados sostenibles que te mantienen en la mente de tu cliente.",
        outcomes: [
          "Auditoría técnica de profundidad",
          "Contenido optimizado para humanos y algoritmos",
          "Link building de alta autoridad",
          "Reportes de ROI mensuales 100% transparentes",
        ],
        accentColor: "var(--color-accent)",
        icon: "🔍",
      },
      {
        id: "ads",
        label: "Ads de Alto Rendimiento",
        description:
          "Campañas diseñadas para generar retorno desde el primer día. Optimizamos cada centavo basado en comportamientos de compra reales.",
        outcomes: [
          "+340% ROI promedio — maximiza el retorno de cada centavo invertido",
          "Costo por lead (CPL) optimizado continuamente",
          "Audiencias ultra-segmentadas de alta intención",
          "A/B testing dinámico para máxima eficiencia",
        ],
        accentColor: "var(--color-accent-warm)",
        icon: "📊",
      },
      {
        id: "automation",
        label: "Automatización de Conversión",
        description:
          "Sistemas inteligentes que responden, califican y agendan leads en piloto automático las 24 horas del día.",
        outcomes: [
          "Respuesta en < 5 segundos — captura leads en su momento de mayor intención",
          "Calificación automática de prospectos premium",
          "Seguimiento automatizado para cerrar ventas",
          "Sincronización total con tu CRM",
        ],
        accentColor: "var(--color-accent)",
        icon: "⚡",
      },
    ],
  },

  proof: {
    metrics: [
      { value: 200, suffix: "+", label: "Clientes con éxito probado" },
      { value: 340, suffix: "%", label: "ROI promedio (Google Ads)" },
      { value: 48, suffix: "h", label: "Tiempo para el sitio inicial" },
    ],
    testimonials: [
      {
        quote:
          "En los primeros 90 días triplicamos las consultas calificadas. Su enfoque de ingeniería web convierte visitantes en clientes como nada que hayamos probado antes.",
        author: "Martín Rodríguez",
        company: "Clínica DermaLife",
        result: "+280% consultas",
      },
      {
        quote:
          "La automatización de WhatsApp redujo nuestro tiempo de respuesta de horas a segundos. No hemos vuelto a perder un solo lead por falta de atención.",
        author: "Laura Méndez",
        company: "Restaurante El Fogón",
        result: "+45% reservas",
      },
      {
        quote:
          "Pasamos de la invisibilidad absoluta a dominar los primeros 3 resultados de búsqueda. El crecimiento orgánico se ha convertido en nuestra mayor fuente de ingresos.",
        author: "Carlos Pereyra",
        company: "FerreMax",
        result: "Top 3 en Google",
      },
    ],
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
