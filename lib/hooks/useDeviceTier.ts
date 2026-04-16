"use client"

import { useState, useEffect } from "react"

export type DeviceTier = "high" | "mid" | "low"

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid")

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4
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
