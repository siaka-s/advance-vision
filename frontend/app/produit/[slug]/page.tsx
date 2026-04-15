import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProductBySlug, formatPrice } from "@/lib/api"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    return {
      title: product.name,
      description: product.description || `${product.brand?.name} — ${product.name}`,
    }
  } catch {
    return { title: "Produit introuvable" }
  }
}

const PRESCRIPTION_GLASSES_PHOTOS = [
  "1574258495973-f010dfbb5371",
  "1508296695146-257a814070b4",
  "1516825295064-c75760b5b2b8",
  "1591076482161-42ce6305b763",
  "1549036615-8494fa1ae61c",
  "1571513722275-4ad6f5e79e88",
  "1477543697173-39c2e3f53c54",
  "1577401239170-897942555fb3",
]

function getImageSrc(url?: string, productId?: number): string {
  if (url && !url.startsWith("/uploads/")) return url
  const photoId = PRESCRIPTION_GLASSES_PHOTOS[(productId ?? 0) % PRESCRIPTION_GLASSES_PHOTOS.length]
  return `https://images.unsplash.com/photo-${photoId}?w=800&h=800&fit=crop&q=85&auto=format`
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params

  let product
  try {
    product = await getProductBySlug(slug)
  } catch {
    notFound()
  }

  const imageSrc = getImageSrc(product.images?.[0]?.url, product.id)
  const isInStock = product.stock_qty > 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-sm text-ink-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/catalogue" className="hover:text-primary transition-colors">Catalogue</Link>
        <span>/</span>
        {product.category?.name && (
          <>
            <Link
              href={`/catalogue?category_id=${product.category_id}`}
              className="hover:text-primary transition-colors"
            >
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-ink-soft font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* ===== IMAGE ===== */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Badge genre */}
            {product.gender && product.gender !== "mixte" && (
              <span className="absolute top-4 left-4 bg-white/90 text-ink-muted text-xs px-3 py-1 rounded-full capitalize backdrop-blur-sm">
                {product.gender}
              </span>
            )}
          </div>

          {/* Galerie miniatures (affichées si plusieurs images) */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={img.id} className="relative aspect-square bg-surface rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
                  <Image
                    src={getImageSrc(img.url, product.id)}
                    alt={`${product.name} — vue ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== INFORMATIONS ===== */}
        <div>
          {/* Marque + catégorie */}
          <div className="flex items-center gap-3 mb-3">
            {product.brand?.name && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wide">
                {product.brand.name}
              </span>
            )}
            {product.category?.name && (
              <span className="text-xs text-ink-muted bg-surface px-3 py-1 rounded-full">
                {product.category.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-ink-soft mb-4 leading-snug">
            {product.name}
          </h1>

          {/* Prix + stock */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-3xl font-bold text-ink">
              {formatPrice(product.price)}
            </p>
            {!isInStock ? (
              <span className="text-sm font-medium text-error bg-error/10 px-3 py-1 rounded-full">
                Rupture de stock
              </span>
            ) : product.stock_qty <= 3 ? (
              <span className="text-sm font-medium text-warning bg-warning/10 px-3 py-1 rounded-full">
                Plus que {product.stock_qty} en stock
              </span>
            ) : (
              <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
                En stock
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-ink-muted text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Caractéristiques */}
          <div className="bg-surface rounded-xl p-5 mb-6">
            <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-4">
              Caractéristiques
            </h2>
            <dl className="space-y-3">
              {product.frame_shape && (
                <div className="flex justify-between text-sm">
                  <dt className="text-ink-muted">Forme</dt>
                  <dd className="font-medium text-ink capitalize">{product.frame_shape}</dd>
                </div>
              )}
              {product.material && (
                <div className="flex justify-between text-sm">
                  <dt className="text-ink-muted">Matière</dt>
                  <dd className="font-medium text-ink capitalize">{product.material}</dd>
                </div>
              )}
              {product.frame_color && (
                <div className="flex justify-between text-sm">
                  <dt className="text-ink-muted">Couleur</dt>
                  <dd className="font-medium text-ink capitalize">{product.frame_color}</dd>
                </div>
              )}
              {product.gender && (
                <div className="flex justify-between text-sm">
                  <dt className="text-ink-muted">Genre</dt>
                  <dd className="font-medium text-ink capitalize">{product.gender}</dd>
                </div>
              )}
              {product.brand?.name && (
                <div className="flex justify-between text-sm">
                  <dt className="text-ink-muted">Marque</dt>
                  <dd className="font-medium text-ink">{product.brand.name}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Options de verres (MVP5 — affiché en lecture seule pour l'instant) */}
          {product.lens_options && product.lens_options.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                Options de verres disponibles
              </h2>
              <div className="space-y-2">
                {product.lens_options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-surface-border bg-white-pure text-sm"
                  >
                    <div>
                      <p className="font-medium text-ink">{opt.name}</p>
                      {opt.description && (
                        <p className="text-xs text-ink-muted mt-0.5">{opt.description}</p>
                      )}
                    </div>
                    {opt.price_addition > 0 && (
                      <span className="text-primary font-semibold whitespace-nowrap ml-4">
                        +{formatPrice(opt.price_addition)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="space-y-3">
            <button
              disabled={!isInStock}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInStock ? "Ajouter au panier" : "Produit indisponible"}
            </button>
            <Link
              href="/rendez-vous"
              className="block w-full text-center border border-primary text-primary font-semibold py-3.5 rounded-xl hover:bg-primary/5 transition-colors"
            >
              Prendre rendez-vous
            </Link>
          </div>

          {/* Avantages */}
          <div className="mt-6 pt-6 border-t border-surface-border grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Livraison à domicile
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Paiement Mobile Money
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Retour sous 7 jours
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Garantie fabricant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
