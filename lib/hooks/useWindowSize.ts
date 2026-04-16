"use client"

import { useState, useEffect } from "react"

export function useWindowSize() {
  const [size, setSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const update = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }, 100)
    }

    setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("resize", update)
      clearTimeout(timeout)
    }
  }, [])

  return size
}
