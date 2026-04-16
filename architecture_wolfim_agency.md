# WOLFIM — CLIENT ACQUISITION MACHINE
## Complete Technical Architecture

> **Version:** 2.0.0 | **Stack:** Next.js 14+ App Router · React 18+ · TypeScript · TailwindCSS · Framer Motion · GSAP · Lenis
> **Updated:** April 2026 — Sections 11-12 added based on competitive analysis of 17 agencies (10 global + 7 Argentine)

---

## 1. SYSTEM OVERVIEW

### 1.1 High-Level Explanation

WOLFIM's landing page is architected as a **cinematic, scroll-driven narrative system** — not a marketing page. Every pixel, frame, and interaction is engineered to move visitors through a deliberate psychological funnel:

```
Attention → Intrigue → Problem Recognition → Solution Belief → Social Proof → Decision → Conversion
```

The system is built around three core engineering pillars:

1. **Narrative Engine** — Scroll position drives storytelling, not just visual effects. Sections don't just appear; they *unfold*.
2. **Performance-First Animation** — All animations are composited on the GPU (transform/opacity only), maintaining a locked 60fps even on mid-range hardware.
3. **Modular Section Architecture** — Every section is a self-contained React component with its own animation contract, data interface, and variant system. This enables future no-code customization and SaaS multi-tenancy.

### 1.2 Rendering Strategy

| Route | Strategy | Rationale |
|---|---|---|
| `/` (main landing) | **SSG** (Static Site Generation) | Maximum CDN cache hit rate; no dynamic data at render time |
| `/[niche]` (cloned variants) | **ISR** (60s revalidation) | Niche-specific copy pulled from CMS, regenerated on demand |
| `/api/leads` | **Server Action / Route Handler** | Serverless function for form submissions |
| `/api/og` | **Edge Runtime** | Dynamic OG image generation per niche |

The default production build outputs fully static HTML with zero server round-trips on initial load. Hydration is deferred via React's `Suspense` boundaries to avoid blocking the main thread.

### 1.3 Performance Philosophy

- **Core Web Vitals targets:** LCP < 1.2s, CLS < 0.05, INP < 100ms
- **JS budget:** < 80KB first load JS (excluding vendor chunks)
- **Animation budget:** GPU-only transforms; `will-change` applied surgically and removed after animation completes
- **No layout thrash:** All GSAP `ScrollTrigger` reads happen inside `requestAnimationFrame`; writes are batched
- **Preload chain:** Critical fonts → LCP image/video → hero JS chunk (in that order)

---

## 2. FOLDER STRUCTURE

### 2.1 Root Structure

```
wolfim/
├── app/                          # Next.js App Router root
│   ├── (landing)/                # Route group: landing pages
│   │   ├── page.tsx              # Default landing (/)
│   │   ├── [niche]/
│   │   │   └── page.tsx          # Niche clones (/agencias, /restaurantes, etc.)
│   │   └── layout.tsx            # Landing layout (no nav shell)
│   ├── api/
│   │   ├── leads/route.ts        # Lead capture endpoint
│   │   └── og/route.tsx          # Edge OG image generator
│   ├── globals.css               # Tailwind base + CSS custom properties
│   ├── layout.tsx                # Root layout (fonts, meta, providers)
│   └── not-found.tsx
│
├── components/
│   ├── ui/                       # Primitive design system components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── motion/                   # Animation wrappers and utilities
│   │   ├── FadeIn.tsx
│   │   ├── RevealText.tsx
│   │   ├── ParallaxLayer.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── MagneticButton.tsx
│   │   └── StaggerChildren.tsx
│   ├── sections/                 # Full-page landing sections
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroVideo.tsx
│   │   │   ├── HeroHeadline.tsx
│   │   │   └── HeroScrollCue.tsx
│   │   ├── Problem/
│   │   │   ├── Problem.tsx
│   │   │   └── PainPointCard.tsx
│   │   ├── Solution/
│   │   │   ├── Solution.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   └── HorizontalScroll.tsx
│   │   ├── Proof/
│   │   │   ├── Proof.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── MetricCounter.tsx
│   │   │   └── CaseStudyStrip.tsx
│   │   ├── LiveFeed/             # 🚀 INNOVATIVE: Fake lead flow simulation
│   │   │   ├── LiveFeed.tsx
│   │   │   └── LeadNotification.tsx
│   │   ├── Pricing/
│   │   │   ├── Pricing.tsx
│   │   │   └── PricingCard.tsx
│   │   └── CTA/
│   │       ├── CTA.tsx
│   │       └── LeadForm.tsx
│   └── layout/
│       ├── StickyNav.tsx
│       ├── CursorFollower.tsx    # Custom cursor
│       └── SmoothScroller.tsx   # Lenis smooth scroll wrapper
│
├── lib/
│   ├── animations/
│   │   ├── gsap.ts              # GSAP + ScrollTrigger singleton
│   │   ├── variants.ts          # Shared Framer Motion variants
│   │   └── easings.ts           # Custom cubic-bezier curves
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useInView.ts
│   │   └── useWindowSize.ts
│   ├── config/
│   │   ├── site.ts              # Global site config (default niche)
│   │   └── niches.ts            # Per-niche copy overrides
│   └── utils/
│       ├── cn.ts                # clsx + tailwind-merge
│       └── leads.ts             # Lead submission utilities
│
├── content/
│   ├── default.ts               # Default landing copy
│   └── niches/
│       ├── agencias.ts
│       ├── restaurantes.ts
│       └── clinicas.ts
│
├── public/
│   ├── videos/
│   │   ├── hero-bg.mp4
│   │   └── hero-bg.webm
│   ├── fonts/                   # Self-hosted font files
│   └── images/
│
├── styles/
│   └── animations.css           # Complex keyframes that CSS handles better
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── vercel.json
```

### 2.2 Component Organization Philosophy

The architecture uses a **Modular Atomic** pattern — not strict Atomic Design, but a pragmatic layering:

- **`ui/`** — Dumb, stateless primitives. No animation logic. Accepts `className` overrides.
- **`motion/`** — Animation HOCs and wrappers. Composable. Consume `useReducedMotion` internally.
- **`sections/`** — Smart, self-contained page sections. Each section owns its data shape via TypeScript interface. Sections are the unit of composition in `page.tsx`.
- **`layout/`** — Global chrome elements persistent across scroll.

---

## 3. PAGE ARCHITECTURE

### 3.1 Section Map

```
/ (page.tsx)
├── <SmoothScroller>         ← Lenis wrapper
│   ├── <CursorFollower />
│   ├── <StickyNav />
│   ├── <Hero />             ← Section 1
│   ├── <Problem />          ← Section 2
│   ├── <Solution />         ← Section 3 (contains HorizontalScroll)
│   ├── <Proof />            ← Section 4
│   ├── <LiveFeed />         ← Section 5 (innovative)
│   ├── <Pricing />          ← Section 6
│   └── <CTA />              ← Section 7
└── </SmoothScroller>
```

---

### 3.2 SECTION: Hero

**Purpose:** Arrest attention within 3 seconds. Establish premium positioning and a single commanding value proposition.

**Visual Design:** Full-viewport video background (dark, desaturated city/motion footage), particle overlay via Canvas, headline that assembles word-by-word on load.

**Components:**
- `HeroVideo` — `<video>` element with `autoPlay muted loop playsInline`, served as `.webm` (Chrome/Firefox) and `.mp4` (Safari). Poster image prevents blank frame.
- `HeroHeadline` — Splits headline string into individual `<span>` elements. Framer Motion `staggerChildren` animates each word from `y: 60, opacity: 0` to `y: 0, opacity: 1` with a spring easing.
- `HeroScrollCue` — Animated scroll indicator using Framer `animate` loop. Fades out once user scrolls > 100px.

**Animation Behavior:**

```typescript
// Hero entrance sequence
const heroSequence = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } }
  }
}

// Per-word variant
const wordVariant = {
  hidden: { y: 60, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { type: "spring", damping: 20, stiffness: 180 }
  }
}
```

**Data interface:**
```typescript
interface HeroData {
  headline: string          // "Tu empresa merece clientes reales."
  subheadline: string
  ctaLabel: string
  ctaHref: string
  videoSrc: { webm: string; mp4: string; poster: string }
  badge?: string            // "Más de 200 negocios en crecimiento"
}
```

---

### 3.3 SECTION: Problem

**Purpose:** Create emotional resonance by naming the exact pains the prospect feels. "They understand me" is the psychological goal.

**Visual Design:** Dark section. Three to five "pain point" cards that appear broken/distressed, each with an icon and a sharp one-liner. Background: subtle red-tinted noise texture.

**Components:**
- `PainPointCard` — Card with a glitch-flicker entrance animation (CSS keyframe: brief `clip-path` distortion). Hover: subtle red glow on border.
- `RevealText` — Splits body copy into lines. Each line revealed by a `scaleX` wipe on a pseudo-element overlay as it enters the viewport.

**Animation Behavior:**
- Cards stagger in via GSAP `ScrollTrigger` (batch mode — triggers all cards once the section enters, not per-card):

```typescript
// gsap.ts utility
ScrollTrigger.batch(".pain-card", {
  onEnter: (batch) => gsap.from(batch, {
    y: 40, opacity: 0, stagger: 0.12, duration: 0.7,
    ease: "power3.out"
  }),
  once: true
})
```

---

### 3.4 SECTION: Solution

**Purpose:** Present WOLFIM's four services (websites, SEO, Ads, WhatsApp automation) as an integrated system — not a menu.

**Visual Design:** Light section. Horizontal scroll strip inside the vertical page scroll. Each service occupies one "slide" in the horizontal track. Right side shows a mockup/screenshot that morphs between services.

**Components:**
- `HorizontalScroll` — Core innovation component. Uses GSAP `ScrollTrigger` to pin the section and convert vertical scroll delta into horizontal `translateX` on the inner track:

```typescript
// HorizontalScroll.tsx
useGSAP(() => {
  const track = trackRef.current
  const slides = track.querySelectorAll(".service-slide")
  const totalWidth = track.scrollWidth - window.innerWidth

  gsap.to(track, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  })
}, [])
```

- `ServiceCard` — Each slide. Contains: service name, description, key outcomes, and a contextual icon. Progress indicator at bottom shows position in horizontal track.

**Data interface:**
```typescript
interface ServiceData {
  id: string
  label: string             // "Websites de Alto Impacto"
  description: string
  outcomes: string[]
  accentColor: string       // CSS variable name
  mockupSrc: string
}
```

---

### 3.5 SECTION: Proof

**Purpose:** Eliminate skepticism with concrete, specific social proof. Metrics must be bold and verifiable-feeling.

**Visual Design:** Dark again (alternating light/dark creates rhythm). Three animated metric counters at the top. Below: a masonry grid of testimonial cards. Bottom strip: logos of recognizable brands/tools used.

**Components:**
- `MetricCounter` — Uses Framer Motion's `useMotionValue` + `useTransform` to animate from 0 to target on entry. Custom formatting for `+`, `%`, `x` suffixes.
- `TestimonialCard` — Quote, author photo (avatar fallback), company name, result achieved. Cards have micro-parallax on hover (mouse tracking via `mousemove` event → `rotateX/Y`).
- `CaseStudyStrip` — Horizontal marquee (infinite scroll via CSS `animation: marquee linear infinite`). No JS required.

---

### 3.6 SECTION: LiveFeed (🚀 Innovative Feature #1)

**Purpose:** Create urgency and social proof simultaneously by simulating live incoming leads in real time.

**Visual Design:** Left side: explanation copy ("Mientras lees esto, otros negocios ya están recibiendo clientes"). Right side: a mock dashboard/notification feed showing fabricated but realistic-looking lead notifications cycling in.

**Implementation:**

```typescript
// LeadNotification pool — realistic fake data
const NOTIFICATION_POOL: LeadNotif[] = [
  { name: "Restaurante El Fogón", city: "Córdoba", service: "Google Ads", time: "hace 2 min" },
  { name: "Clínica DermaLife", city: "Buenos Aires", service: "SEO", time: "hace 5 min" },
  // ... 30+ entries
]

// LiveFeed.tsx
const [queue, setQueue] = useState<LeadNotif[]>([])

useEffect(() => {
  const interval = setInterval(() => {
    const notif = NOTIFICATION_POOL[Math.floor(Math.random() * NOTIFICATION_POOL.length)]
    setQueue(prev => [notif, ...prev].slice(0, 6)) // keep last 6
  }, 2800)
  return () => clearInterval(interval)
}, [])
```

Each notification animates in from top with Framer Motion `AnimatePresence` + `layout` prop for smooth reflow.

---

### 3.7 SECTION: Pricing

**Purpose:** Remove friction from the pricing decision. Three tiers with a clear "recommended" visual hierarchy.

**Visual Design:** Three cards. Center card ("Crecimiento") is elevated, slightly larger, with a glowing border. Toggle between monthly/annual billing (Framer Motion `LayoutGroup` for the toggle animation).

**Components:**
- `PricingCard` — Accepts `featured` boolean. Featured card uses `scale(1.04)` and a `box-shadow` pulse animation.
- Billing toggle — State in parent. Prices animate via Framer `AnimatePresence` with `mode="wait"` for clean number swap.

---

### 3.8 SECTION: CTA

**Purpose:** Final conversion. One clear action, zero distractions.

**Visual Design:** Full viewport. Gradient mesh background (CSS `background: radial-gradient` stack). Large headline. Lead capture form with three fields max (name, email/WhatsApp, business type). Submit triggers a success state with a confetti burst (`canvas-confetti`).

**Form strategy:**
- Controlled React state — no `<form>` submit, handled via `onClick` on the button
- Client-side validation before hitting `/api/leads`
- Success state: form morphs into a "Te contactamos en menos de 24 hs" confirmation panel

---

## 4. PARALLAX & ANIMATION SYSTEM

### 4.1 Smooth Scroll Foundation

All scroll-based animations depend on **Lenis** for buttery smooth scroll inertia:

```typescript
// SmoothScroller.tsx
"use client"
import Lenis from "@studio-freight/lenis"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

    // Connect Lenis to GSAP's ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}
```

### 4.2 Parallax Implementation Strategy

Three distinct parallax systems, chosen by use case:

**System A — CSS Transform Parallax (background layers)**
Used for: Hero video depth, decorative blobs behind sections.
Mechanism: `transform: translateY(calc(var(--scroll-y) * 0.3px))` driven by a CSS custom property updated in a single `requestAnimationFrame` listener.

```typescript
// useScrollY.ts — updates a CSS custom property on <html>
useEffect(() => {
  let rafId: number
  const update = () => {
    document.documentElement.style.setProperty(
      "--scroll-y", String(window.scrollY)
    )
    rafId = requestAnimationFrame(update)
  }
  rafId = requestAnimationFrame(update)
  return () => cancelAnimationFrame(rafId)
}, [])
```

**System B — Framer Motion `useScroll` + `useTransform` (section-level)**
Used for: Text blocks that drift at different rates, foreground/background layer separation.

```typescript
// ParallaxLayer.tsx
export function ParallaxLayer({ children, speed = 0.3 }: Props) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>
}
```

**System C — GSAP ScrollTrigger scrub (complex, multi-element)**
Used for: Horizontal scroll section, SVG path drawing, element pinning.
GSAP handles these because Framer Motion can't pin elements or drive multi-element timelines from a single scrub value.

### 4.3 Framer Motion vs GSAP Decision Matrix

| Use Case | Tool | Reason |
|---|---|---|
| Component mount/unmount | Framer Motion | `AnimatePresence` handles exit animations elegantly |
| Hover microinteractions | Framer Motion | `whileHover` / `whileTap` is ergonomic |
| Stagger reveals on scroll | Both (GSAP preferred) | GSAP's `batch` is more performant for many elements |
| Pinned sections | GSAP | Framer cannot pin; this is a GSAP strength |
| Number counters | Framer Motion | `useMotionValue` + `useTransform` is clean |
| Path/SVG animations | GSAP | `drawSVG` plugin is unmatched |
| Page-level scroll progress | Framer Motion | `useScroll` + `useTransform` is declarative |
| Complex sequenced timelines | GSAP | `gsap.timeline()` with callbacks |

### 4.4 Performance Considerations

- **`will-change` discipline:** Applied only immediately before animation starts (via JS class toggle), removed after via `onComplete` callback. Never set globally in CSS.
- **Intersection Observer gating:** Animations that are off-screen never initialize. GSAP `ScrollTrigger.refresh()` called after fonts/images load to recalculate positions.
- **`useReducedMotion` hook:** All motion components check `window.matchMedia("(prefers-reduced-motion: reduce)")`. If true, animations are replaced with simple `opacity` fades at 200ms.

```typescript
// hooks/useReducedMotion.ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    mq.addEventListener("change", (e) => setReduced(e.matches))
  }, [])
  return reduced
}
```

- **GSAP singleton:** Registered plugins once on module init, never re-registered:

```typescript
// lib/animations/gsap.ts
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)
}

export { gsap, ScrollTrigger }
```

---

## 5. COMPONENT DESIGN SYSTEM

### 5.1 Design Tokens (CSS Custom Properties)

```css
/* globals.css */
:root {
  /* Color palette */
  --color-bg:          #080808;
  --color-surface:     #111111;
  --color-border:      rgba(255,255,255,0.08);
  --color-accent:      #C8FF00;        /* WOLFIM signature: electric lime */
  --color-accent-warm: #FF6B35;        /* Secondary: burnt orange */
  --color-text:        #F5F5F5;
  --color-muted:       #6B6B6B;

  /* Typography scale */
  --font-display:      "Editorial New", Georgia, serif;   /* Premium editorial serif */
  --font-body:         "Neue Haas Grotesk", "Helvetica Neue", sans-serif;
  --font-mono:         "JetBrains Mono", monospace;

  /* Spacing */
  --section-pad-y:     clamp(80px, 12vw, 160px);
  --container-width:   min(1280px, 90vw);

  /* Easing */
  --ease-out-expo:     cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);

  /* Borders */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
}
```

### 5.2 Button System

```typescript
// ui/Button.tsx
type ButtonVariant = "primary" | "ghost" | "outline" | "danger"
type ButtonSize    = "sm" | "md" | "lg" | "xl"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  magnetic?: boolean   // enables MagneticButton wrapping
}
```

Variant styles (Tailwind classes):

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| `primary` | `bg-accent` | `text-black` | none | `scale(1.03)` + glow shadow |
| `ghost` | transparent | `text-text` | none | `bg-white/5` |
| `outline` | transparent | `text-text` | `border-border` | `bg-white/5` + border brightens |
| `danger` | `bg-red-500/10` | `text-red-400` | `border-red-500/20` | `bg-red-500/20` |

**Magnetic Button** — Premium hover interaction where the button physically follows the cursor within its bounding box:

```typescript
// motion/MagneticButton.tsx
export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0); y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x, y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </motion.div>
  )
}
```

### 5.3 Card System

Three card types with consistent anatomy:

```
┌─────────────────────────────┐
│ [icon / media]               │  ← Optional media slot
│                              │
│  Title                       │  ← Always present
│  Body text                   │  ← Optional
│                              │
│  [footer / CTA]              │  ← Optional action slot
└─────────────────────────────┘
```

Props pattern:
```typescript
interface CardProps {
  variant: "default" | "elevated" | "featured" | "glass"
  size: "sm" | "md" | "lg"
  interactive?: boolean   // adds hover transform + cursor pointer
  media?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}
```

Glass card (used in Pricing): `backdrop-filter: blur(16px)` + `background: rgba(255,255,255,0.04)` + `border: 1px solid rgba(255,255,255,0.1)`.

### 5.4 Typography System

```typescript
// Heading component with predefined scale
<Heading level={1} size="display">   {/* 96px clamp */}
<Heading level={2} size="xl">        {/* 56px clamp */}
<Heading level={3} size="lg">        {/* 36px clamp */}
<Body size="lg" muted>               {/* 18px, color-muted */}
<Label variant="overline">           {/* 11px, letter-spacing: 0.15em, uppercase */}
```

Font pairing:
- **Display font:** "Editorial New" (Pangram Pangram) — italic forms used for emphasis words
- **Body font:** "Neue Haas Grotesk Display" — not Helvetica Neue; it has the optical refinement needed at large sizes

---

## 6. STATE & DATA FLOW

### 6.1 State Architecture

This is fundamentally a **static content site with a single mutable concern** (the lead form). State is deliberately minimal:

```
Global State (React Context)
├── ThemeContext         — Not needed (single dark theme)
├── SiteConfigContext    — Active niche config (copy, colors, CTAs)
└── FormContext          — Lead form state across steps (if multi-step)

Local State (useState / useRef)
├── Hero                — video loaded boolean, scroll position
├── LiveFeed            — notification queue array
├── Pricing             — billing period toggle ("monthly" | "annual")
└── CTA Form            — field values, validation errors, submission state
```

### 6.2 Content Configuration

All copy lives in **TypeScript config files** — no CMS required at launch. This allows version-controlled copy, instant deployments, and easy niche cloning:

```typescript
// content/default.ts
export const defaultSiteConfig: SiteConfig = {
  niche: "default",
  hero: {
    headline: "Tu empresa merece clientes reales.",
    subheadline: "Diseñamos el sistema completo: web, SEO, Ads y automatización.",
    cta: { label: "Quiero resultados", href: "#cta" }
  },
  services: [...],
  proof: {
    metrics: [
      { value: 200, suffix: "+", label: "Negocios en crecimiento" },
      { value: 340, suffix: "%", label: "ROI promedio en Ads" },
      { value: 48, suffix: "h", label: "Tiempo de entrega inicial" }
    ],
    testimonials: [...]
  },
  pricing: [...],
  cta: { headline: "El próximo resultado puede ser el tuyo." }
}
```

Niche overrides use deep partial merging:

```typescript
// content/niches/clinicas.ts
import { defaultSiteConfig } from "../default"
import { deepMerge } from "@/lib/utils"

export const clinicasSiteConfig = deepMerge(defaultSiteConfig, {
  hero: {
    headline: "Tu clínica llena de pacientes, cada mes.",
    badge: "Especialistas en salud digital"
  }
})
```

### 6.3 Future CMS Migration Path

When volume demands CMS, the `SiteConfig` TypeScript type becomes the **Sanity/Contentful schema**. The config files are replaced by API calls with identical data shapes. Zero component changes required.

---

## 7. PERFORMANCE STRATEGY

### 7.1 JavaScript Loading

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
}
```

- Framer Motion is tree-shaken. Import only what you use: `import { motion, AnimatePresence } from "framer-motion"` — never the default barrel.
- GSAP plugins imported lazily in the component that needs them, not in the global bundle.
- `HorizontalScroll` (GSAP-heavy) loaded with `next/dynamic` + `ssr: false`:

```typescript
const HorizontalScroll = dynamic(() => import("./HorizontalScroll"), {
  ssr: false,
  loading: () => <HorizontalScrollSkeleton />
})
```

### 7.2 Video Optimization

```
hero-bg-source.mp4 (original, 4K)
    │
    ├── ffmpeg → hero-bg.webm (VP9, 1080p, CRF 33, 2-pass) ~1.8MB
    └── ffmpeg → hero-bg.mp4  (H.264, 1080p, CRF 28)       ~2.4MB
```

```bash
# Optimal hero video encode
ffmpeg -i source.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -vf scale=1920:1080 \
  -deadline best -cpu-used 0 -an hero-bg.webm

ffmpeg -i source.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 \
  -movflags +faststart -an hero-bg.mp4
```

In the component:
```tsx
<video autoPlay muted loop playsInline preload="none"
  poster="/images/hero-poster.jpg">
  <source src="/videos/hero-bg.webm" type="video/webm" />
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
```

`preload="none"` — video does not block the critical path. It loads after LCP image (poster). On mobile where `autoPlay` is often restricted, the poster image serves as a static background.

### 7.3 Image Strategy

All images use `next/image` with:
- `sizes` attribute set precisely per breakpoint
- `priority` on the hero poster image only (LCP element)
- `loading="lazy"` (default) for all below-fold images
- WebP format (Next.js handles conversion automatically)
- Placeholder blur: 10px inline base64 from `plaiceholder` at build time

```typescript
import { getPlaiceholder } from "plaiceholder"

// In generateStaticParams / page.tsx
const { base64 } = await getPlaiceholder(imagePath)
```

### 7.4 Avoiding Layout Shift

- All font files self-hosted in `/public/fonts/` with `font-display: swap`
- Font preload link tags in `<head>` for the two display weights used above the fold
- All `<Image>` components have explicit `width` and `height` set (never auto)
- CLS-prone elements (video, dynamic notifications) have fixed dimensions with `min-height`
- `ScrollTrigger.refresh()` called inside `window.addEventListener("load")` to recalculate after all assets resolve

---

## 8. SEO & MARKETING INTEGRATION

### 8.1 Metadata Strategy

```typescript
// app/(landing)/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WOLFIM — Sistemas de Adquisición de Clientes | Web · SEO · Ads · WhatsApp",
  description: "Diseñamos tu sistema completo de captación de clientes: websites de alto impacto, SEO en Google, campañas de Ads y automatización por WhatsApp.",
  keywords: ["agencia de marketing", "diseño web profesional", "SEO Argentina", "Google Ads"],
  openGraph: {
    title: "WOLFIM — Tu negocio merece clientes reales",
    description: "...",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    locale: "es_AR",
    type: "website"
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://wolfim.com" },
  robots: { index: true, follow: true }
}
```

### 8.2 Structured Data (JSON-LD)

```typescript
// Injected via <script type="application/ld+json"> in layout.tsx
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "WOLFIM",
  "url": "https://wolfim.com",
  "logo": "https://wolfim.com/images/logo.png",
  "description": "Agencia de adquisición de clientes: web, SEO, Google Ads, WhatsApp",
  "areaServed": "AR",
  "serviceType": ["Web Design", "SEO", "Digital Advertising", "Marketing Automation"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "48"
  }
}
```

### 8.3 Niche Landing Page Duplication

Each niche route (`/clinicas`, `/restaurantes`, `/agencias`) generates its own static page with:
- Unique `<title>` and `<meta description>` targeting niche keywords
- Unique canonical URL
- Niche-specific JSON-LD schema
- Same visual shell, different copy tokens

URL strategy:
```
wolfim.com/                    → Generic (all industries)
wolfim.com/clinicas            → Clínicas y salud
wolfim.com/restaurantes        → Gastronomía
wolfim.com/agencias            → Agencias y consultoras
wolfim.com/ecommerce           → Tiendas online
```

Each niche page is independently indexable and can receive direct paid traffic without cannibalizing the main domain.

### 8.4 Dynamic OG Image

Edge function generates per-niche OG images using `@vercel/og`:

```typescript
// app/api/og/route.tsx
import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const niche = searchParams.get("niche") ?? "default"
  const headline = getNicheHeadline(niche)

  return new ImageResponse(
    <div style={{ /* OG template JSX */ }}>
      <span>{headline}</span>
    </div>,
    { width: 1200, height: 630 }
  )
}
```

---

## 9. DEPLOYMENT

### 9.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/videos/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000" }
      ]
    }
  ]
}
```

Region: `gru1` (São Paulo) — closest to Argentina, Colombia, Chile markets.

### 9.2 Environment Variables

```bash
# .env.local (never commit)
NEXT_PUBLIC_SITE_URL=https://wolfim.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PIXEL_ID=1234567890

# Server-only (lead submissions)
CRM_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxx/yyy
RESEND_API_KEY=re_xxxxxxxxxxxx
NOTION_SECRET=secret_xxxxxxxx
NOTION_DB_ID=xxxxxxxxxxxxxxxx

# Optional: reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Le...
RECAPTCHA_SECRET_KEY=6Le...
```

Variables prefixed `NEXT_PUBLIC_` are inlined at build time and exposed to the browser. Server-only variables are never sent to the client.

### 9.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: lint-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: lint-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

Branch strategy: `main` → production. PRs generate preview deployments automatically. No staging environment needed at this scale.

---

## 10. FUTURE SAAS EVOLUTION

### 10.1 Architecture Evolution Map

```
Phase 1 (Now)          Phase 2 (6mo)          Phase 3 (12mo+)
─────────────          ─────────────          ───────────────
Static landing    →    Multi-tenant API   →   Full SaaS platform
Single brand           Client accounts        Self-serve builder
Manual leads           CRM integration        Automated pipeline
```

### 10.2 Multi-Tenant System

The current `SiteConfig` interface becomes the **tenant data model**. Each WOLFIM client gets a subdomain with their own config:

```
wolfim.com                 → WOLFIM's own landing
cliente1.wolfim.com        → Client 1's landing (their brand, their copy)
cliente2.wolfim.com        → Client 2's landing
```

Technical changes required:
1. `SiteConfig` moved to a database (PlanetScale MySQL or Supabase Postgres)
2. Middleware reads subdomain → fetches tenant config → injects into page via `generateMetadata`
3. Sections become **niche templates** selectable per tenant
4. Assets (videos, logos) stored in tenant-scoped S3/R2 bucket paths

```typescript
// middleware.ts (future)
export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host")
  const subdomain = hostname?.split(".")[0]
  const tenantConfig = await getTenantConfig(subdomain)

  const response = NextResponse.next()
  response.headers.set("x-tenant-config", JSON.stringify(tenantConfig))
  return response
}
```

### 10.3 Dashboard

New route group `app/(dashboard)/` completely separate from `(landing)/`. Dashboard concerns:
- Lead inbox (webhook receipts stored in DB)
- Analytics integration (GA4 + Vercel Analytics)
- Copy editor (edit `SiteConfig` fields via form)
- Section toggler (enable/disable sections per client)
- Conversion tracking (form submissions → funnel metrics)

Authentication: **NextAuth.js v5** with Google OAuth + magic link. Each client account has `role: "client"` with scoped access to only their tenant data.

### 10.4 User-Generated Landing Pages (Builder Mode)

The section component architecture already enables this. Each section component accepts a fully typed `data` prop — this is the serializable "block" in a future drag-and-drop builder.

The builder UI (Phase 3):
1. Client selects from section templates (Hero variants, Proof layouts, etc.)
2. Editor stores a JSON array of `{ sectionId: string, data: SectionData }[]`
3. The landing page renders this array with a `<DynamicSection>` renderer
4. Published via ISR: `revalidatePath("/client-slug")` on save

```typescript
// Future: DynamicSection renderer
const SECTION_MAP: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  problem: Problem,
  solution: Solution,
  // ...
}

export function DynamicLanding({ sections }: { sections: SectionBlock[] }) {
  return (
    <>
      {sections.map(block => {
        const Section = SECTION_MAP[block.sectionId]
        return <Section key={block.id} {...block.data} />
      })}
    </>
  )
}
```

This architecture positions WOLFIM to become the **Webflow for client acquisition systems** — a focused, high-end vertical SaaS rather than a generic website builder.

---

## APPENDIX: Innovation Feature Summary

| # | Feature | Section | Tech |
|---|---|---|---|
| 1 | **Live Lead Feed Simulation** | LiveFeed | React state, AnimatePresence |
| 2 | **Horizontal Scroll Inside Vertical** | Solution | GSAP ScrollTrigger pin |
| 3 | **Cinematic Word-by-Word Headline** | Hero | Framer Motion stagger |
| 4 | **Magnetic Cursor Buttons** | CTA, Nav | useMotionValue |
| 5 | **Performance-Aware Animation** | Global | useReducedMotion + GSAP prefers check |
| 6 | **Niche-Adaptive Copy System** | All | TypeScript config + ISR |
| 7 | **CSS Custom Property Parallax** | Hero, BGs | rAF + CSS var injection |
| 8 | **Dynamic OG Image per Niche** | Meta | Vercel Edge + @vercel/og |
| 9 | **6-Depth Cinematic Layer System** | All sections | ParallaxSection + Layer composable |
| 10 | **Mouse-Reactive Depth Layers** | Hero, CTA | useMotionValue + depth sensitivity |
| 11 | **Adaptive Performance Monitor** | Global | useFrameRate + useDeviceTier |
| 12 | **Benchmark-Informed Strategy** | Architecture | Competitive data from 17 agencies |

---

---

## 11. LAYERED CINEMATIC RENDERING SYSTEM

> Added based on competitive analysis of 17 global + Argentine agencies. No agency in Argentina uses a depth-based parallax layer system. This is WOLFIM's visual signature.

### 11.1 Core Abstraction

Two new primitives replace all ad-hoc parallax implementations:

```typescript
// components/motion/ParallaxSection.tsx
"use client"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function ParallaxSection({ children, className, id }: ParallaxSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden", className)}
      style={{ isolation: "isolate" }} // Creates stacking context
    >
      {children}
    </section>
  )
}
```

```typescript
// components/motion/Layer.tsx
"use client"

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { useRef, useEffect } from "react"
import { useReducedMotion } from "@/lib/hooks/useReducedMotion"
import { useWindowSize } from "@/lib/hooks/useWindowSize"

type LayerDepth = 0 | 1 | 2 | 3 | 4 | 5
type LayerType = "background" | "content" | "floating" | "fx"
type LayerAxis = "y" | "x" | "both"

interface LayerProps {
  children: React.ReactNode
  depth: LayerDepth
  type?: LayerType
  axis?: LayerAxis
  speed?: number          // Override auto-calculated speed
  blur?: boolean          // Apply depth-based blur
  scale?: boolean         // Apply depth-based scale
  mouseReactive?: boolean // Follow cursor on desktop
  className?: string
}

// Depth configuration table
const DEPTH_CONFIG: Record<LayerDepth, {
  zIndex: number
  speed: number         // Scroll parallax multiplier
  opacity: number       // Base opacity
  blurAmount: string    // CSS blur value
  scaleBase: number     // Starting scale
}> = {
  0: { zIndex: 0,   speed: 0.15, opacity: 0.6,  blurAmount: "2px",  scaleBase: 1.15 },  // Background
  1: { zIndex: 10,  speed: 0.3,  opacity: 0.8,  blurAmount: "1px",  scaleBase: 1.08 },  // Overlay
  2: { zIndex: 20,  speed: 0.5,  opacity: 0.9,  blurAmount: "0px",  scaleBase: 1.03 },  // Mid content
  3: { zIndex: 30,  speed: 0.7,  opacity: 1.0,  blurAmount: "0px",  scaleBase: 1.0  },  // Foreground (UI/text)
  4: { zIndex: 40,  speed: 0.9,  opacity: 1.0,  blurAmount: "0px",  scaleBase: 1.0  },  // Floating elements
  5: { zIndex: 50,  speed: 1.1,  opacity: 0.7,  blurAmount: "0px",  scaleBase: 1.0  },  // FX (glow, particles)
}

export function Layer({
  children,
  depth,
  type = "content",
  axis = "y",
  speed: speedOverride,
  blur = false,
  scale = false,
  mouseReactive = false,
  className,
}: LayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { width } = useWindowSize()
  const isMobile = width < 768

  const config = DEPTH_CONFIG[depth]
  const effectiveSpeed = speedOverride ?? config.speed

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yRange = effectiveSpeed * 200
  const xRange = effectiveSpeed * 100

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    axis !== "x" ? [`${-yRange}px`, `${yRange}px`] : ["0px", "0px"]
  )

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    axis !== "y" ? [`${-xRange}px`, `${xRange}px`] : ["0px", "0px"]
  )

  // Mouse-reactive parallax (desktop only)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (!mouseReactive || isMobile || reducedMotion) return

    const sensitivity = (depth - 2.5) * 8 // Deeper = less movement, shallower = more
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set((e.clientX - centerX) * sensitivity * 0.01)
      mouseY.set((e.clientY - centerY) * sensitivity * 0.01)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseReactive, isMobile, reducedMotion, depth, mouseX, mouseY])

  // Reduced motion: disable parallax, keep structure
  if (reducedMotion) {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0", className)}
        style={{
          zIndex: config.zIndex,
          opacity: config.opacity,
        }}
      >
        {children}
      </div>
    )
  }

  // Mobile: simplified parallax (no mouse, reduced intensity)
  const mobileSpeedMultiplier = isMobile ? 0.3 : 1

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute inset-0",
        type === "fx" && "pointer-events-none",
        className
      )}
      style={{
        zIndex: config.zIndex,
        opacity: config.opacity,
        y: isMobile ? useTransform(y, v => `${parseFloat(v) * mobileSpeedMultiplier}px`) : y,
        x: isMobile ? undefined : x,
        ...(mouseReactive && !isMobile ? {
          translateX: mouseX,
          translateY: mouseY,
        } : {}),
        ...(blur ? { filter: `blur(${config.blurAmount})` } : {}),
        ...(scale ? { scale: config.scaleBase } : {}),
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: depth * 0.3 + 0.5, // Heavier layers feel more massive
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 11.2 Depth System Specification

```
DEPTH SCALE — VISUAL HIERARCHY
═══════════════════════════════════════════════════════════════

Depth 0 │ BACKGROUND    │ Video, gradient mesh, ambient texture
        │ speed: 0.15   │ Moves slowest → feels furthest away
        │ blur: 2px     │ Subtle defocus reinforces depth
        │ scale: 1.15   │ Oversized to prevent edge reveal on parallax
        │ opacity: 0.6  │ Subdued to not compete with content
────────┼───────────────┼──────────────────────────────────────
Depth 1 │ OVERLAY       │ Gradient overlays, noise textures, grid patterns
        │ speed: 0.3    │ Slightly faster than background
        │ blur: 1px     │ Light defocus
        │ scale: 1.08   │
        │ opacity: 0.8  │
────────┼───────────────┼──────────────────────────────────────
Depth 2 │ MID CONTENT   │ Mockup images, decorative shapes, secondary text
        │ speed: 0.5    │ Middle ground — natural reading pace
        │ blur: 0       │ Sharp
        │ scale: 1.03   │
        │ opacity: 0.9  │
────────┼───────────────┼──────────────────────────────────────
Depth 3 │ FOREGROUND    │ Headlines, body text, cards, UI elements
        │ speed: 0.7    │ Moves at near-scroll speed
        │ blur: 0       │ Perfectly sharp
        │ scale: 1.0    │ Actual size
        │ opacity: 1.0  │ Full visibility
────────┼───────────────┼──────────────────────────────────────
Depth 4 │ FLOATING      │ Floating badges, notification pills, CTAs
        │ speed: 0.9    │ Moves slightly faster than scroll
        │ blur: 0       │ Sharp
        │ scale: 1.0    │
        │ opacity: 1.0  │ Full visibility
────────┼───────────────┼──────────────────────────────────────
Depth 5 │ FX            │ Glow orbs, particle effects, light flares
        │ speed: 1.1    │ Moves fastest → feels closest
        │ blur: 0       │ (glow is inherently soft)
        │ scale: 1.0    │
        │ opacity: 0.7  │ Semi-transparent (additive feel)
        │ pointer-events: none │ Never blocks interaction
```

### 11.3 Example: Hero Layer Stack

```tsx
// sections/Hero/Hero.tsx
import { ParallaxSection } from "@/components/motion/ParallaxSection"
import { Layer } from "@/components/motion/Layer"

export function Hero({ data }: { data: HeroData }) {
  return (
    <ParallaxSection className="h-screen" id="hero">

      {/* Layer 0 — Background video */}
      <Layer depth={0} type="background" blur scale>
        <HeroVideo src={data.videoSrc} />
      </Layer>

      {/* Layer 1 — Gradient overlay */}
      <Layer depth={1} type="background">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-wolfim-bg" />
      </Layer>

      {/* Layer 1.5 — Noise texture */}
      <Layer depth={1} type="background" speed={0.2}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(/images/noise.png)", backgroundSize: "200px" }} />
      </Layer>

      {/* Layer 2 — Mockup/device preview */}
      <Layer depth={2} mouseReactive axis="both">
        <div className="absolute right-[5%] bottom-[10%] w-[40vw] max-w-[500px]">
          <img src="/images/hero-mockup.png" alt="Dashboard preview" />
        </div>
      </Layer>

      {/* Layer 3 — Headline (foreground) */}
      <Layer depth={3} type="content">
        <div className="container mx-auto h-full flex flex-col justify-center">
          <Badge>{data.badge}</Badge>
          <HeroHeadline text={data.headline} />
          <p className="text-wolfim-muted text-lg max-w-xl mt-4">{data.subheadline}</p>
          <div className="mt-8">
            <Button variant="primary" size="xl" magnetic>
              {data.ctaLabel}
            </Button>
          </div>
        </div>
      </Layer>

      {/* Layer 4 — Floating UI elements */}
      <Layer depth={4} type="floating" mouseReactive>
        <div className="absolute top-[20%] right-[15%]">
          <FloatingBadge icon="chart" text="+340% ROI" />
        </div>
        <div className="absolute bottom-[25%] left-[10%]">
          <FloatingBadge icon="users" text="200+ clientes" />
        </div>
      </Layer>

      {/* Layer 5 — FX (glow orbs) */}
      <Layer depth={5} type="fx" mouseReactive>
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px]
          rounded-full bg-wolfim-accent/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[25%] w-[200px] h-[200px]
          rounded-full bg-wolfim-warm/10 blur-[80px]" />
      </Layer>

      {/* Scroll cue — always on top */}
      <Layer depth={4} type="floating">
        <HeroScrollCue />
      </Layer>

    </ParallaxSection>
  )
}
```

### 11.4 Layer Orchestration

**Scroll Progress Mapping:**
Each `ParallaxSection` calculates its own scroll progress (0 → 1) from section entry to exit. Layers within that section move relative to this local progress — not global scroll offset.

**Enter/Exit Behavior:**
```typescript
// Layer visibility thresholds
const LAYER_LIFECYCLE = {
  background:  { enterAt: -0.2, exitAt: 1.2 },   // Visible beyond section bounds
  content:     { enterAt: 0.0,  exitAt: 1.0 },    // Visible only within section
  floating:    { enterAt: 0.05, exitAt: 0.95 },   // Slightly inset
  fx:          { enterAt: -0.1, exitAt: 1.1 },     // Slightly beyond
}
```

**Cross-Section Synchronization:**
Adjacent sections share depth-0 layers (backgrounds blend via CSS `mix-blend-mode: multiply`). This creates seamless transitions — the viewer feels one continuous 3D space rather than discrete sections.

### 11.5 Performance Rules (STRICT)

```
MAX LAYERS PER SECTION
═══════════════════════════════════════
Desktop:  6 layers max (all types)
Tablet:   4 layers max (remove FX, simplify floating)
Mobile:   3 layers max (background + content + 1 floating)

WHEN TO DISABLE EFFECTS
═══════════════════════════════════════
blur:           Disabled on mobile (iOS performance)
mouseReactive:  Disabled below 768px width
scale:          Disabled if IntersectionObserver reports < 30fps
particles:      Disabled if navigator.hardwareConcurrency < 4

GPU OPTIMIZATION RULES
═══════════════════════════════════════
1. Only transform + opacity on animated layers (NEVER width, height, top, left)
2. will-change applied ONLY during active animation (via JS class toggle)
3. Layers with type="fx" use contain: paint to isolate repaint
4. Max 2 blur() filters active simultaneously across all visible sections
5. Background videos use object-fit: cover (no JS resize listeners)
```

### 11.6 Mobile Fallback System

```typescript
// lib/hooks/useDeviceTier.ts
type DeviceTier = "high" | "mid" | "low"

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid")

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as any).deviceMemory || 4
    const isMobile = window.innerWidth < 768

    if (isMobile && (cores <= 4 || memory <= 4)) {
      setTier("low")
    } else if (cores >= 8 && memory >= 8 && !isMobile) {
      setTier("high")
    } else {
      setTier("mid")
    }
  }, [])

  return tier
}
```

**Tier-based layer behavior:**

| Feature | High (Desktop 8+ cores) | Mid (Default) | Low (Mobile <4 cores) |
|---------|------------------------|---------------|----------------------|
| Max layers | 6 | 4 | 3 |
| Mouse reactive | ✅ Yes | ✅ Yes | ❌ No |
| Blur effects | ✅ Yes | ✅ 1 max | ❌ No |
| Parallax speed | 100% | 60% | 30% |
| FX layer | ✅ Full | ✅ Simplified | ❌ Hidden |
| Video background | ✅ Playing | ✅ Playing | ⚡ Poster only |

### 11.7 Mouse-Reactive Layers (Desktop Enhancement)

```typescript
// Enhanced mouse tracking with spring physics
// Applied to layers with mouseReactive={true}

const MOUSE_CONFIG = {
  stiffness: 80,
  damping: 25,
  mass: 1,
  // Deeper layers react LESS to mouse (feels further away)
  sensitivityByDepth: {
    0: 0.003,  // Background barely moves
    1: 0.006,
    2: 0.012,
    3: 0.018,  // Content follows gently
    4: 0.030,  // Floating follows noticeably
    5: 0.045,  // FX follows most aggressively
  }
}
```

This creates a **pseudo-3D parallax** effect: when the user moves their cursor, background layers shift subtly while foreground/FX layers shift more dramatically — simulating depth perception.

### 11.8 Adaptive Performance Monitor

```typescript
// lib/hooks/useFrameRate.ts
export function useFrameRate(sampleSize = 60) {
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frames: number[] = []
    let lastTime = performance.now()
    let rafId: number

    const measure = () => {
      const now = performance.now()
      frames.push(1000 / (now - lastTime))
      lastTime = now

      if (frames.length >= sampleSize) {
        const avg = frames.reduce((a, b) => a + b) / frames.length
        setFps(Math.round(avg))
        frames = []
      }

      rafId = requestAnimationFrame(measure)
    }

    rafId = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(rafId)
  }, [sampleSize])

  return fps
}

// Usage in Layer system: auto-downgrade if FPS drops
// If fps < 45 for 3 consecutive samples → disable blur + reduce layers
// If fps < 30 → disable parallax entirely, fallback to static fade-in
```

---

## 12. BENCHMARK-INFORMED COMPETITIVE STRATEGY

> Section added based on analysis of 10 US/global agencies and 7 Argentine agencies conducted April 2026.

### 12.1 Technology Gap Exploitation

WOLFIM is positioned in the **technology gap** between Argentine and global agency standards:

```
Argentine Market Stack         WOLFIM Stack                Global Leader Stack
(WordPress + Bootstrap)    →   (Next.js + Tailwind     →   (Next.js + Custom)
(LCP ~3-5s)                    + GSAP + Lenis)             (LCP ~1.5s)
(No parallax)                  (LCP < 1.2s)                (Multi-layer effects)
                               (6-layer cinematic)
```

Key technical advantages over ALL Argentine competitors:
1. **SSG + ISR** — Static generation with on-demand revalidation (no Argentine agency uses this)
2. **Edge Runtime** — Vercel Edge in São Paulo (GRU1), <50ms TTFB for Argentina
3. **GPU-composited animations** — 60fps parallax while competitors use CPU-bound CSS
4. **TypeScript end-to-end** — Type-safe content system enabling future SaaS evolution

### 12.2 Visual Identity Uniqueness Score

Color uniqueness verified against all 17 agencies analyzed:

| WOLFIM Token | Closest Competitor Color | Distance | Unique? |
|---|---|---|---|
| `#C8FF00` (lime accent) | MD Marketing `#77FB6C` | High — neon vs pastel | ✅ Unique |
| `#080808` (dark bg) | NP Digital dark scheme | Similar intent | ✅ Only dark in AR |
| `#FF6B35` (warm accent) | NP Digital `#FF5E29` | Close | ⚠️ Differentiate via usage |
| Editorial New serif | No competitor uses serif | N/A | ✅ Completely unique |

### 12.3 WOLFIM ENGINE™ — Proprietary Platform Roadmap

Inspired by: Boomit One, Caissa AEGIS, Spiralyze Predictive Engine

```
Phase 1 (Launch): TypeScript config system
                  ↓
Phase 2 (3mo):    Client dashboard (lead inbox + analytics)
                  ↓
Phase 3 (6mo):    A/B testing framework + niche templates
                  ↓
Phase 4 (12mo):   Full self-serve builder (multi-tenant SaaS)
```

### 12.4 Pricing Strategy

Based on benchmark data:

```
ARGENTINA MARKET RATES:          WOLFIM PRICING:
──────────────────────           ─────────────────
Seonet:    $300-600/mo           Starter:     $500/mo (web + basic SEO)
Way2net:   $400-800/mo           Growth:      $1,200/mo (web + SEO + Ads)
Caissa:    $600-1,200/mo         Scale:       $2,500/mo (full system + automation)
Boomit:    $1,000-3,000/mo       Enterprise:  Custom

GLOBAL (for reference):
SmartSites: $3,000-10,000/mo
Spiralyze:  $5,000-25,000/mo
CRE:        $15,000-50,000/mo
```

WOLFIM sits at the **premium end of Argentine pricing** but delivers **global-quality output** — creating a value proposition that is virtually impossible to match locally.

---

*WOLFIM Architecture v2.0 — Built to convert. Engineered to scale. Informed by global competitive intelligence. 🐺*
