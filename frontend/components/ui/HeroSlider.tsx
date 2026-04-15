"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

interface Slide {
  image: string
  title: string
  subtitle: string
  cta: { label: string; href: string }
}

const slides: Slide[] = [
  {
    image: "/images/hero/slide-1.jpg",
    title: "Votre opticien se déplace chez vous",
    subtitle: "Test de vue, essayage et livraison à domicile partout en Côte d'Ivoire.",
    cta: { label: "Demander un déplacement", href: "/rendez-vous" },
  },
  {
    image: "/images/hero/slide-2.jpg",
    title: "Des lunettes qui vous ressemblent",
    subtitle: "Découvrez notre collection de lunettes de vue, solaires, sport et luxe.",
    cta: { label: "Voir le catalogue", href: "/catalogue" },
  },
  {
    image: "/images/hero/slide-3.jpg",
    title: "Essayage à domicile",
    subtitle: "Sélectionnez vos paires préférées en ligne. On se déplace avec elles.",
    cta: { label: "Comment ça marche", href: "/rendez-vous" },
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const goTo = useCallback((index: number) => {
    // Fade out la section info, change le slide, fade in
    setVisible(false)
    setTimeout(() => {
      setCurrent(index)
      setVisible(true)
    }, 300)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <>
      {/* ===== SECTION HERO — images + titre en gras ===== */}
      <div className="relative w-full overflow-hidden" style={{ height: "630px" }}>

        {/* Toutes les images chargées dans le DOM */}
        {slides.map((s, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: idx === current ? 1 : 0,
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              zIndex: idx === current ? 1 : 0,
            }}
          >
          </div>
        ))}

        {/* Flèche gauche */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          aria-label="Slide précédente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flèche droite */}
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          aria-label="Slide suivante"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Points de navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Aller à la slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ===== SECTION INFO — défile en parallèle avec les images ===== */}
      <div className="bg-white-pure border-b border-surface-border">
        <div
          className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* Sous-titre */}
          <p className="text-ink-muted text-base max-w-lg text-center sm:text-left">
            {slide.subtitle}
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href={slide.cta.href}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors text-center"
            >
              {slide.cta.label}
            </Link>
            <Link
              href="/catalogue"
              className="border border-primary text-primary px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors text-center"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
