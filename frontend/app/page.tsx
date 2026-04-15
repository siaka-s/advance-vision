import Link from "next/link"
import { getProducts } from "@/lib/api"
import ProductCard from "@/components/catalog/ProductCard"
import ScrollReveal from "@/components/ui/ScrollReveal"
import HeroSlider from "@/components/ui/HeroSlider"

export default async function HomePage() {
  // Récupération des produits mis en avant directement depuis le backend
  const featured = await getProducts({ is_featured: true, limit: 8 })

  return (
    <>
      {/* ============ HERO SLIDER ============ */}
      <HeroSlider />

      {/* ============ PRODUITS MIS EN AVANT ============ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
                Sélection
              </p>
              <h2 className="text-3xl font-bold text-ink-soft">
                Nos coups de cœur
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="text-primary text-sm font-medium hover:underline hidden sm:block"
            >
              Voir tout →
            </Link>
          </div>

          {featured.data.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featured.data.map((product, idx) => (
                <ScrollReveal key={product.id} delay={idx * 60}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-12">
              Aucun produit mis en avant pour le moment.
            </p>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/catalogue"
              className="text-primary text-sm font-medium hover:underline"
            >
              Voir tout le catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ AVANTAGES ============ */}
      <section className="bg-surface py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="font-semibold text-ink-soft mb-2">Livraison à domicile</h3>
            <p className="text-sm text-ink-muted">Partout en Côte d'Ivoire</p>
          </div>

          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 4.5h3" />
              </svg>
            </div>
            <h3 className="font-semibold text-ink-soft mb-2">Paiement Mobile Money</h3>
            <p className="text-sm text-ink-muted">Orange, MTN, Moov, CB</p>
          </div>

          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-ink-soft mb-2">Rendez-vous en ligne</h3>
            <p className="text-sm text-ink-muted">Examen de vue & conseils</p>
          </div>
        </div>
      </section>
    </>
  )
}
