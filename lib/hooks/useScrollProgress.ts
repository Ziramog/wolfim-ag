"use client"

import { useEffect } from "react"

export function useScrollProgress() {
  useEffect(() => {
    let rafId: number
    const update = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        String(window.scrollY)
      )
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])
}
