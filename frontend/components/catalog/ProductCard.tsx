import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/api"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

// Images locales du slider hero — cyclées par ID produit
const HERO_IMAGES = ["/images/hero/slide-1.jpg", "/images/hero/slide-2.jpg", "/images/hero/slide-3.jpg"]

function getImageSrc(product: Product): string {
  const localImage = product.images?.[0]?.url
  if (localImage && !localImage.startsWith("/uploads/")) return localImage
  return HERO_IMAGES[product.id % HERO_IMAGES.length]
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = getImageSrc(product)

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block bg-white-pure rounded-xl border border-surface-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface rounded-t-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Badge catégorie */}
        {product.category?.name && (
          <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {product.category.name}
          </span>
        )}

        {/* Badge genre */}
        {product.gender && product.gender !== "mixte" && (
          <span className="absolute top-3 right-3 bg-white/90 text-ink-muted text-xs px-2 py-1 rounded-full capitalize backdrop-blur-sm">
            {product.gender}
          </span>
        )}
      </div>

      {/* Informations */}
      <div className="p-4">
        {/* Marque */}
        <p className="text-xs text-ink-muted font-medium uppercase tracking-wide mb-1">
          {product.brand?.name}
        </p>

        {/* Nom */}
        <h3 className="text-sm font-semibold text-ink-soft group-hover:text-primary transition-colors line-clamp-2 mb-3">
          {product.name}
        </h3>

        {/* Prix + stock */}
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-ink">
            {formatPrice(product.price)}
          </p>
          {product.stock_qty === 0 && (
            <span className="text-xs text-error font-medium">Rupture</span>
          )}
          {product.stock_qty > 0 && product.stock_qty <= 3 && (
            <span className="text-xs text-warning font-medium">Dernières pièces</span>
          )}
        </div>
      </div>
    </Link>
  )
}
