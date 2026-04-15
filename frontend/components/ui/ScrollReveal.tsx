"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Délai d'animation en ms (pour les grilles, décaler chaque carte) */
  delay?: number
}

/**
 * Enveloppe un élément et lui applique un effet de zoom + fondu
 * au moment où il entre dans le champ de vision lors du scroll.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // État initial : invisible + légèrement réduit
    el.style.opacity = "0"
    el.style.transform = "scale(0.92) translateY(16px)"
    el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "scale(1) translateY(0)"
          observer.unobserve(el) // Une seule fois suffit
        }
      },
      { threshold: 0.12 } // Se déclenche dès que 12 % de l'élément est visible
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
