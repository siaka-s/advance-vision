"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { logout } from "@/lib/auth"
import { useAuthStore } from "@/stores/auth-store"

export default function ClientPage() {
  const router = useRouter()
  const { user, logout: clearUser } = useAuthStore()

  // Rediriger vers /connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (user === null) {
      router.push("/connexion")
    }
  }, [user, router])

  if (!user) return null

  async function handleLogout() {
    await logout()
    clearUser()
    router.push("/")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">

      {/* En-tête */}
      <div className="mb-10">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Espace client</p>
        <h1 className="text-2xl font-bold text-ink-soft">
          Bonjour, {user.first_name} !
        </h1>
        <p className="text-ink-muted text-sm mt-1">{user.email}</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/rendez-vous"
          className="flex items-center gap-4 p-5 bg-white-pure border border-surface-border rounded-xl hover:border-primary/40 transition-colors"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-ink-soft text-sm">Prendre rendez-vous</p>
            <p className="text-xs text-ink-muted mt-0.5">Test de vue à domicile</p>
          </div>
        </Link>

        <Link
          href="/client/commandes"
          className="flex items-center gap-4 p-5 bg-white-pure border border-surface-border rounded-xl hover:border-primary/40 transition-colors"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-ink-soft text-sm">Mes commandes</p>
            <p className="text-xs text-ink-muted mt-0.5">Suivi en temps réel</p>
          </div>
        </Link>

        <Link
          href="/catalogue"
          className="flex items-center gap-4 p-5 bg-white-pure border border-surface-border rounded-xl hover:border-primary/40 transition-colors"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-ink-soft text-sm">Catalogue</p>
            <p className="text-xs text-ink-muted mt-0.5">Parcourir les lunettes</p>
          </div>
        </Link>

        <Link
          href="/zone-service"
          className="flex items-center gap-4 p-5 bg-white-pure border border-surface-border rounded-xl hover:border-primary/40 transition-colors"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-ink-soft text-sm">Zone de service</p>
            <p className="text-xs text-ink-muted mt-0.5">Vérifier ma commune</p>
          </div>
        </Link>
      </div>

      {/* Déconnexion */}
      <div className="border-t border-surface-border pt-6">
        <button
          onClick={handleLogout}
          className="text-sm text-ink-muted hover:text-error transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
