# Prompt for Claude — Layered Cinematic Rendering System (Section 11)

You are a senior frontend architect.

I already have a complete architecture.md (attached).  
Your task is NOT to rewrite it.

Your task is to extend and upgrade it by adding a NEW section:

# 11. LAYERED CINEMATIC RENDERING SYSTEM

---

## 🎯 GOAL

Transform the current parallax implementation into a unified, reusable cinematic layer engine.

This system must:

- Standardize how layers behave across ALL sections
- Enable depth-based rendering (not just scroll animations)
- Be reusable and composable
- Maintain high performance (60fps)

---

## 🧱 REQUIREMENTS

### 1. Define a NEW CORE ABSTRACTION

Create:

- <ParallaxSection>
- <Layer>

Each Layer must support:

- depth (z-index logic)
- speed (scroll parallax intensity)
- axis ("y", "x", "both")
- type ("background" | "content" | "floating" | "fx")
- blur (optional depth effect)
- scale (for perspective simulation)

---

### 2. DEPTH SYSTEM (CRITICAL)

Define a depth scale like:

- Depth 0 → background (slowest)
- Depth 1 → overlay
- Depth 2 → mid content
- Depth 3 → foreground (UI/text)
- Depth 4 → floating elements
- Depth 5 → FX (glow, particles)

Explain:

- z-index mapping
- movement differences
- opacity/blur scaling

---

### 3. IMPLEMENTATION STRATEGY

Provide:

- React component structure
- Example usage inside Hero section
- How it integrates with:
  - Framer Motion
  - GSAP (if needed)
  - Lenis

---

### 4. LAYER ORCHESTRATION

Define how a section controls layers:

- Scroll progress mapping
- When layers enter/exit
- Synchronization between layers

---

### 5. PERFORMANCE RULES

Be VERY strict:

- max layers per section
- when to disable effects
- mobile fallback strategy
- GPU optimization rules

---

### 6. MOBILE FALLBACK SYSTEM

Define:

- Reduced layer count
- Disabled effects (blur, particles)
- Simplified motion

---

### 7. EXAMPLE: HERO LAYER STACK

Provide a full breakdown like:

Layer 0 → video  
Layer 1 → gradient  
Layer 2 → mockup  
Layer 3 → headline  
Layer 4 → floating UI  
Layer 5 → FX  

Include motion behavior for each.

---

### 8. OPTIONAL (HIGH VALUE)

If possible, propose:

- mouse-reactive layers (desktop only)
- adaptive intensity (based on device performance)

---

## ⚠️ IMPORTANT RULES

- Do NOT repeat existing sections
- Do NOT rewrite previous architecture
- Only ADD section 11
- Keep same level of technical depth as the document
- Be concrete (code > theory)

---

Now generate ONLY section 11.
