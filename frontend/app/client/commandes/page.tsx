import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mes commandes",
  description: "Suivez vos commandes Les Opticiens Mobiles.",
}

export default function CommandesPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-ink-soft mb-3">Mes commandes</h1>
      <p className="text-ink-muted mb-8">
        Le suivi de commande sera disponible dès la mise en place de l'espace client.
        Vous pourrez suivre l'état de vos commandes en temps réel.
      </p>
      <Link href="/" className="border border-surface-border text-ink-muted px-6 py-3 rounded-lg font-semibold hover:bg-surface transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  )
}
