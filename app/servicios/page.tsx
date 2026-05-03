"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { CursorFollower } from "@/components/layout/CursorFollower"
import { StickyNav } from "@/components/layout/StickyNav"
import { Footer } from "@/components/layout/Footer"

const services = [
  { number: "01", tag: "Diseño", title: "Identidad visual a medida", description: "No más plantillas. Diseño creado para tu marca, nadie más tiene este sitio." },
  { number: "02", tag: "Video", title: "Hero con video de fondo", description: "Primera impresión que impacta. Mostrá tu producto o servicio en contexto real." },
  { number: "03", tag: "UX", title: "Buscador con filtros inteligentes", description: "El cliente encuentra lo que busca en segundos. Sin fricción, sin frustración." },
  { number: "04", tag: "Galería", title: "Galería de fotos y videos", description: "Recorrido visual completo. Cada producto se muestra como merece." },
  { number: "05", tag: "Leads", title: "Formulario + registro de leads", description: "Capturamos datos útiles, no ruido. Información que te ayuda a cerrar." },
  { number: "06", tag: "Tech", title: "Tecnología Next.js", description: "Carga ultra-rápida. Mejor posicionamiento en Google. Más visitas orgánicas." },
  { number: "07", tag: "Maps", title: "Mapa interactivo + Street View", description: "Google Street View integrado. El cliente explora la zona sin salir del sitio." },
  { number: "08", tag: "WhatsApp", title: "Botón WhatsApp flotante", description: "Siempre visible. Consulta directa, sin fricción. Sin salir de la página." },
  { number: "09", tag: "Admin", title: "Panel de administración", description: "Alta, baja y actualización sin depender de nadie. Control total en minutos." },
  { number: "10", tag: "SEO", title: "SEO local optimizado", description: "Mejor visibilidad en búsquedas de tu zona. Más exposición sin pagar ads." },
  { number: "11", tag: "Motion", title: "Efectos parallax en scroll", description: "Experiencia visual premium. Lo que diferencia un sitio profesional de uno amateur." },
  { number: "12", tag: "Nav", title: "Navegación personalizada", description: "Menús y sidebar adaptados al recorrido del usuario. Estructura que guía." },
]

const pricingPlans = [
  { label: "Pago único", title: "Sitio web profesional", subtitle: "Diseño + desarrollo + panel de administración", price: "Desde USD 300", note: "Pago único · 50% adelantado", features: ["Diseño a medida", "12 funcionalidades", "Panel admin incluido", "Entrega en 2-3 semanas"] },
  { label: "Recurrente", title: "Mantenimiento mensual", subtitle: "Todo incluido. Vos te enfocás en tu negocio.", price: "USD 25", note: "Sin permanencia · Cancelás cuando quieras", suffix: "/mes", features: ["Hosting + SSL incluido", "Soporte técnico <24hs", "Backups automáticos", "Actualización de contenido", "Cambios menores de diseño", "Dominio incluido", "Reporte mensual de visitas"] },
  { label: "Opcional", title: "Google Ads", subtitle: "Tráfico calificado desde el día 1", price: "Desde USD 80", note: "Setup único: USD 150 · Presupuesto Google aparte", suffix: "/mes", features: ["Keywords de tu zona", "Campañas optimizadas", "Reportes + ajustes mensuales", "Presupuesto google: USD 30–400"] },
]

const deliveryItems = [
  { step: "2-3 Sem", title: "Plazo de entrega", desc: "Desde confirmación y adelanto." },
  { step: "50%", title: "Adelanto", desc: "La mitad para comenzar. El resto al entregar." },
  { step: "∞", title: "Sin permanencia", desc: "El mantenimiento se cancela cuando quieras." },
  { step: "✓", title: "Contrato simple", desc: "Acuerdo claro y por escrito." },
]

const steps = [
  { num: "01", title: "Confirmar interés", desc: "WhatsApp, llamada o mensaje. En menos de 24hs coordinamos." },
  { num: "02", title: "Enviar accesos", desc: "Acceso al dominio actual para planificar la transición." },
  { num: "03", title: "Compartir contenido", desc: "Fotos, textos y datos. Nosotros cargamos todo." },
  { num: "04", title: "50% + arrancamos", desc: "Adelanto confirmado y el proyecto comienza." },
]

const diagProblems = [
  { num: "01", icon: "Crítico", title: "Template genérico", desc: "El sitio no se diferencia de ningún otro. Los clientes lo olvidan antes de cerrar la pestaña." },
  { num: "02", icon: "Crítico", title: "Cero adaptación móvil", desc: "La gente busca desde el celular. Si la experiencia falla, el cliente pasa al siguiente." },
  { num: "03", icon: "Crítico", title: "Sin video inmersivo", desc: "No hay forma de mostrar tu producto en contexto. La primera impresión es plana." },
  { num: "04", icon: "Crítico", title: "Contactar es difícil", desc: "WhatsApp y teléfono escondidos. Cada clic extra es un cliente que se va sin dejar datos." },
  { num: "05", icon: "Crítico", title: "Filtros que confunden", desc: "Más opciones no es mejor. El usuario se pierde y termina cerrando el navegador." },
  { num: "06", icon: "Crítico", title: "Sin prueba social", desc: "Testimonios ausentes. Sin reseñas ni casos, la credibilidad se desploma." },
]

// Scroll-reveal wrapper
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// Card that reveals on scroll with alternating direction
function RevealCard({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isLeft = index % 2 === 0
  const x = isLeft ? -50 : 50

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default function ServiciosPage() {
  return (
    <>
      <CursorFollower />
      <StickyNav />
      <main className="min-h-screen bg-[#d4d4d4]">
        {/* Hero */}
        <section className="bg-[#c4ff00] px-6 md:px-16 py-20 md:py-28">
          <div className="max-w-[1100px] mx-auto">
            <motion.p
              className="text-[11px] tracking-[0.2em] uppercase text-black/50 mb-6 font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Servicios Wolfim
            </motion.p>
            <motion.h1
              className="font-roboto text-[clamp(48px,8vw,100px)] font-bold leading-[1] text-black mb-6"
              style={{ letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Tu sitio debería<br />cerrar clientes.
            </motion.h1>
            <motion.p
              className="text-2xl text-black font-bold max-w-xl mb-12"
              style={{ lineHeight: 1.5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Sin fricción. Sin excusas. Solo resultados.
            </motion.p>
            <motion.div
              className="flex gap-10 pt-8 border-t border-black/20 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div>
                <strong className="block text-lg text-black font-bold mb-1">Tiempo</strong>
                <span className="text-black/70">2-3 semanas</span>
              </div>
              <div>
                <strong className="block text-lg text-black font-bold mb-1">Tecnología</strong>
                <span className="text-black/70">Next.js + Vercel</span>
              </div>
              <div>
                <strong className="block text-lg text-black font-bold mb-1">Incluye</strong>
                <span className="text-black/70">12 funcionalidades</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Diagnóstico / Lo que resuelves */}
        <section className="px-6 md:px-16 py-24 max-w-[1100px] mx-auto">
          <RevealSection delay={0}>
            <p className="text-[12px] tracking-[0.25em] uppercase text-black/40 mb-4 font-bold">01 — Diagnóstico</p>
            <h2 className="font-roboto text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-black mb-4" style={{ letterSpacing: "-0.01em" }}>
              Lo que está<br />costando <em className="italic">clientes</em>
            </h2>
            <p className="text-lg text-black/60 mb-16 max-w-[580px] font-medium">
              Cada día con el sitio actual es una consulta menos. Estos son los problemas que no ves — pero tus competidores sí.
            </p>
          </RevealSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-black/10">
            {diagProblems.map((item, i) => (
              <RevealCard key={item.num} index={i} className="bg-[#c0c0c0] p-8 border-l-2 border-transparent hover:border-[#c0392b] transition-colors">
                <div className="font-roboto text-[56px] font-bold text-[#c0392b] leading-[1] mb-3">{item.num}</div>
                <span className="inline-block bg-[#fee2e2] text-[#c0392b] text-[11px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded mb-4">{item.icon}</span>
                <h3 className="text-[14px] font-bold text-black mb-2 tracking-[0.02em]">{item.title}</h3>
                <p className="text-[14.5px] text-black/60 leading-[1.7] font-medium">{item.desc}</p>
              </RevealCard>
            ))}
          </div>

          <RevealSection delay={0.3} className="mt-12 p-10 bg-[#c4ff00] border-l-4 border-black">
            <p className="text-lg text-black leading-[1.7]">
              <strong>Tu sitio actual es un directorio.</strong> Necesitás una herramienta de ventas — que transmita autoridad, que guíe y que cierre consultas.
            </p>
          </RevealSection>
        </section>

        <hr className="border-black/10 mx-16" />

        {/* Solución / Features */}
        <section className="px-6 md:px-16 py-24 max-w-[1100px] mx-auto">
          <RevealSection>
            <p className="text-[12px] tracking-[0.25em] uppercase text-black/40 mb-4 font-bold">02 — Solución</p>
            <h2 className="font-roboto text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-black mb-4" style={{ letterSpacing: "-0.01em" }}>
              Wolfim.<br />Un sitio que <em className="italic">vende.</em>
            </h2>
            <p className="text-lg text-black/60 mb-16 max-w-[580px] font-medium">
              <strong>12 funcionalidades construidas alrededor de un solo objetivo: que el visitante consulte.</strong>
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {services.map((s, i) => (
              <RevealCard key={s.number} index={i}>
                <div className="border-b border-black/10 py-5 flex items-start gap-4">
                  <div className="w-9 h-9 bg-black flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-black mb-1">{s.title}</h3>
                    <p className="text-[14px] text-black/50 leading-[1.65] font-medium">{s.description}</p>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </section>

        <hr className="border-black/10 mx-16" />

        {/* Pricing */}
        <section id="pricing" className="bg-[#c8c8c8] px-6 md:px-16 py-24">
          <div className="max-w-[1100px] mx-auto">
            <RevealSection>
              <p className="text-[12px] tracking-[0.25em] uppercase text-black/40 mb-4 font-bold">03 — Inversión</p>
              <h2 className="font-roboto text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-black mb-4" style={{ letterSpacing: "-0.01em" }}>
                Precios claros.<br />Sin <em className="italic">letra chica.</em>
              </h2>
              <p className="text-lg text-black/60 mb-16 max-w-[580px] font-medium">
                Lo que ves es lo que pagás. Sin sorpresas, sin permanencia forzada.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] justify-center">
              {pricingPlans.map((plan, i) => (
                <RevealCard key={plan.label} index={i} className="bg-[#a5d6a7] p-10 border-2 border-[#2e7d32] shadow-lg max-w-[340px] w-full">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-black font-bold mb-5">{plan.label}</p>
                  <h3 className="font-roboto text-2xl font-semibold text-black mb-2">{plan.title}</h3>
                  <p className="text-[13px] text-black/60 mb-6 font-medium">{plan.subtitle}</p>
                  <div className="font-roboto text-[60px] font-bold text-black leading-[1] mb-1">{plan.price}</div>
                  <p className="text-[12px] text-black/50 mb-8 font-medium">{plan.note}</p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="text-[13.5px] text-black/70 flex items-center gap-3 font-medium border-b border-[#66bb6a] pb-2">
                        <span className="w-[18px] h-[18px] flex-shrink-0">
                          <svg viewBox="0 0 20 20" fill="#2e7d32">
                            <path d="M16.7 5.3a1 1 0 0 0-1.4 0L8 12.6 4.7 9.3a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l8-8a1 1 0 0 0 0-1.4z" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-black/10 mx-16" />

        {/* Entrega */}
        <section className="bg-[#c8c8c8] px-6 md:px-16 py-24 max-w-[1100px] mx-auto">
          <RevealSection>
            <p className="text-[12px] tracking-[0.25em] uppercase text-black/40 mb-4 font-bold">04 — Logística</p>
            <h2 className="font-roboto text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-black mb-4" style={{ letterSpacing: "-0.01em" }}>
              Condiciones<br />de <em className="italic">entrega</em>
            </h2>
            <p className="text-lg text-black/60 mb-16 max-w-[580px] font-medium">
              Simple, directo y sin compromisos innecesarios.
            </p>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
            {deliveryItems.map((item, i) => (
              <RevealCard key={item.step} index={i} className="bg-[#c0c0c0] p-8 border-l-2 border-transparent hover:border-[#2e7d32] transition-colors">
                <div className="font-roboto text-[64px] font-bold text-[#2e7d32] leading-[1] mb-4">{item.step}</div>
                <h3 className="text-[14px] font-bold text-black mb-2">{item.title}</h3>
                <p className="text-[13px] text-black/60 leading-[1.6] font-medium">{item.desc}</p>
              </RevealCard>
            ))}
          </div>
        </section>

        <hr className="border-black/10 mx-16" />

        {/* Próximos pasos */}
        <section className="bg-[#c8c8c8] px-6 md:px-16 py-24 max-w-[1100px] mx-auto">
          <RevealSection>
            <p className="text-[12px] tracking-[0.25em] uppercase text-black/40 mb-4 font-bold">05 — Acción</p>
            <h2 className="font-roboto text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-black mb-4" style={{ letterSpacing: "-0.01em" }}>
              Próximos<br /><em className="italic">pasos</em>
            </h2>
            <p className="text-lg text-black/60 mb-16 max-w-[580px] font-medium">
              Confirmás hoy, arrancamos mañana.
            </p>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
            {steps.map((step, i) => (
              <RevealCard key={step.num} index={i} className="bg-[#c0c0c0] p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 bg-[#2e7d32] h-0 group-hover:h-full transition-all duration-500" />
                <div className="font-roboto text-[52px] font-bold text-[#2e7d32] leading-[1] mb-4">{step.num}</div>
                <h3 className="text-[14px] font-bold text-black mb-2">{step.title}</h3>
                <p className="text-[13px] text-black/60 leading-[1.6] font-medium">{step.desc}</p>
              </RevealCard>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-black px-6 md:px-16 py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_120%,rgba(245,197,24,.15)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <RevealSection>
              <p className="text-[18px] tracking-[0.25em] text-white/80 mb-6 font-bold">¿Arrancamos?</p>
              <h2 className="font-roboto text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-white mb-6" style={{ letterSpacing: "-0.01em" }}>
                El sitio que tenés hoy<br />no está generando resultados.
              </h2>
              <p className="text-xl text-white/60 mb-6 font-semibold max-w-[600px] mx-auto">
                Este está diseñado para hacerlo.
              </p>
              <p className="text-lg text-white/40 mb-12">
                Cada día sin él es una oportunidad que se pierde.
              </p>
              <a
                href="https://wa.me/5493510000000"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-14 py-6 text-[14px] font-bold tracking-[0.1em] uppercase shadow-[0_4px_24px_rgba(37,211,102,0.3)] hover:bg-[#1da851] hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar por WhatsApp
              </a>
            </RevealSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white px-6 md:px-16 py-5 border-t border-black/10">
          <div className="max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/mobile/logo.jpeg" alt="WOLFIM" className="h-[50px] w-auto object-contain" />
            </div>
            <p className="text-[12px] text-black/40">Wolfim — Córdoba, Argentina · Mayo 2026</p>
          </div>
        </footer>
      </main>
    </>
  )
}