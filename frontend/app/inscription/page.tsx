"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { register } from "@/lib/auth"
import { useAuthStore } from "@/stores/auth-store"

export default function InscriptionPage() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await register(form)
      setUser(user)
      router.push("/client")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink-soft mb-2">Créer un compte</h1>
          <p className="text-sm text-ink-muted">
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="text-primary font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white-pure border border-surface-border rounded-2xl p-8 space-y-5">

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Prénom + Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                autoComplete="given-name"
                placeholder="Kouamé"
                className="w-full px-4 py-2.5 border border-surface-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1.5">
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                autoComplete="family-name"
                placeholder="Konan"
                className="w-full px-4 py-2.5 border border-surface-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1.5">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="vous@exemple.com"
              className="w-full px-4 py-2.5 border border-surface-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1.5">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              placeholder="07 00 00 00 00"
              className="w-full px-4 py-2.5 border border-surface-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              minLength={8}
              className="w-full px-4 py-2.5 border border-surface-border rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>

          <p className="text-xs text-ink-muted text-center">
            En créant un compte, vous acceptez nos conditions d'utilisation.
          </p>
        </form>

      </div>
    </div>
  )
}
