"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const catalogueItems = [
  { label: "Tous les produits",    href: "/catalogue",                  desc: "Voir toute la collection" },
  { label: "Lunettes de vue",      href: "/catalogue?category_id=1",    desc: "Correction & style" },
  { label: "Lunettes solaires",    href: "/catalogue?category_id=2",    desc: "Protection UV" },
  { label: "Lunettes de sport",    href: "/catalogue?category_id=3",    desc: "Performance & confort" },
  { label: "Lunettes de luxe",     href: "/catalogue?category_id=4",    desc: "Grandes marques" },
]

const servicesItems = [
  { label: "Test de vue à domicile", href: "/rendez-vous", desc: "Un opticien se déplace chez vous" },
  { label: "Essayage à domicile",    href: "/rendez-vous", desc: "Essayez plusieurs paires chez vous" },
  { label: "Prise de mesures",       href: "/rendez-vous", desc: "Mesures précises pour vos verres" },
  { label: "Livraison à domicile",   href: "/rendez-vous", desc: "Partout en Côte d'Ivoire" },
]

export default function Header() {
  const [menuOpen, setMenuOpen]           = useState(false)
  const [catalogueOpen, setCatalogueOpen] = useState(false)
  const [servicesOpen, setServicesOpen]   = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const catalogueRef = useRef<HTMLDivElement>(null)
  const servicesRef  = useRef<HTMLDivElement>(null)
  const pathname     = usePathname()

  // Ombre au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Fermer les dropdowns si clic en dehors
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catalogueRef.current && !catalogueRef.current.contains(e.target as Node)) {
        setCatalogueOpen(false)
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setMenuOpen(false)
    setCatalogueOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "?")

  return (
    <header
      className={`bg-white-pure sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "border-b border-surface-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            {/* Icône lunettes */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-primary font-bold text-lg tracking-tight whitespace-nowrap">
              Les Opticiens Mobiles
            </span>
          </Link>

          {/* ===== NAVIGATION DESKTOP ===== */}
          <nav className="hidden lg:flex items-center gap-1">

            {/* Dropdown Catalogue */}
            <div ref={catalogueRef} className="relative">
              <button
                onClick={() => { setCatalogueOpen(!catalogueOpen); setServicesOpen(false) }}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/catalogue")
                    ? "text-primary bg-primary/5"
                    : "text-ink-muted hover:text-primary hover:bg-surface"
                }`}
              >
                Catalogue
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${catalogueOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {catalogueOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white-pure border border-surface-border rounded-xl shadow-lg overflow-hidden">
                  {catalogueItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col px-4 py-3 hover:bg-surface transition-colors border-b border-surface-border last:border-0"
                    >
                      <span className="text-sm font-medium text-ink-soft">{item.label}</span>
                      <span className="text-xs text-ink-muted mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Nos Services */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => { setServicesOpen(!servicesOpen); setCatalogueOpen(false) }}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/rendez-vous"
                    ? "text-primary bg-primary/5"
                    : "text-ink-muted hover:text-primary hover:bg-surface"
                }`}
              >
                Nos services
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white-pure border border-surface-border rounded-xl shadow-lg overflow-hidden">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex flex-col px-4 py-3 hover:bg-surface transition-colors border-b border-surface-border last:border-0"
                    >
                      <span className="text-sm font-medium text-ink-soft">{item.label}</span>
                      <span className="text-xs text-ink-muted mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "text-primary bg-primary/5"
                  : "text-ink-muted hover:text-primary hover:bg-surface"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* ===== ACTIONS ===== */}
          <div className="flex items-center gap-2">

            {/* Panier */}
            <button
              aria-label="Panier"
              className="relative p-2 rounded-lg text-ink-muted hover:text-primary hover:bg-surface transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.847-7.148a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>

            {/* Mon compte */}
            <Link
              href="/client"
              aria-label="Mon compte"
              className="hidden sm:flex p-2 rounded-lg text-ink-muted hover:text-primary hover:bg-surface transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            {/* Bouton Rendez-vous — desktop */}
            <Link
              href="/rendez-vous"
              className="hidden lg:inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors ml-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Rendez-vous
            </Link>

            {/* Bouton hamburger mobile */}
            <button
              className="lg:hidden p-2 rounded-lg text-ink-muted hover:text-primary hover:bg-surface transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== MENU MOBILE ===== */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen border-t border-surface-border" : "max-h-0"
        }`}
      >
        <nav className="px-4 py-4 space-y-1">

          {/* Catalogue */}
          <div>
            <button
              onClick={() => setCatalogueOpen(!catalogueOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors"
            >
              Catalogue
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-ink-muted transition-transform duration-200 ${catalogueOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {catalogueOpen && (
              <div className="ml-3 mt-1 space-y-1">
                {catalogueItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-primary hover:bg-surface transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Nos Services */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors"
            >
              Nos services
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-ink-muted transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="ml-3 mt-1 space-y-1">
                {servicesItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-primary hover:bg-surface transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors">
            Contact
          </Link>

          <Link href="/client" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors">
            Mon compte
          </Link>

          <div className="pt-2">
            <Link
              href="/rendez-vous"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white text-sm font-semibold px-4 py-3 rounded-lg hover:bg-primary-hover transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Prendre rendez-vous
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
