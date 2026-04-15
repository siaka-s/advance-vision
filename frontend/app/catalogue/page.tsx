import { Suspense } from "react"
import { getProducts, getCategories, getBrands } from "@/lib/api"
import ProductCard from "@/components/catalog/ProductCard"
import CatalogueFilters from "@/components/catalog/CatalogueFilters"
import CataloguePagination from "@/components/catalog/CataloguePagination"
import ScrollReveal from "@/components/ui/ScrollReveal"
import type { ProductFilter } from "@/types"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata = {
  title: "Catalogue",
  description: "Découvrez toute notre collection de lunettes : vue, solaires, sport et luxe.",
}

export default async function CataloguePage({ searchParams }: PageProps) {
  const params = await searchParams

  // Lire les filtres depuis l'URL
  const filter: ProductFilter = {
    page:        params.page        ? Number(params.page)        : 1,
    limit:       20,
    category_id: params.category_id ? Number(params.category_id) : undefined,
    brand_id:    params.brand_id    ? Number(params.brand_id)    : undefined,
    gender:      params.gender      ? String(params.gender)      : undefined,
    price_min:   params.price_min   ? Number(params.price_min)   : undefined,
    price_max:   params.price_max   ? Number(params.price_max)   : undefined,
    search:      params.search      ? String(params.search)      : undefined,
  }

  // Chargement parallèle des données
  const [result, categories, brands] = await Promise.all([
    getProducts(filter),
    getCategories(),
    getBrands(),
  ])

  const hasActiveFilters = !!(
    filter.category_id ||
    filter.brand_id ||
    filter.gender ||
    filter.price_min ||
    filter.search
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* En-tête */}
      <div className="mb-8">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
          Notre collection
        </p>
        <h1 className="text-3xl font-bold text-ink-soft">
          Catalogue
        </h1>
        {result.total > 0 && (
          <p className="text-ink-muted mt-1 text-sm">
            {result.total} produit{result.total > 1 ? "s" : ""} trouvé{result.total > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar filtres */}
        <Suspense>
          <CatalogueFilters categories={categories} brands={brands} />
        </Suspense>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          {result.data.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-ink-soft mb-2">
                Aucun produit trouvé
              </h2>
              <p className="text-ink-muted text-sm">
                {hasActiveFilters
                  ? "Essayez de modifier ou supprimer certains filtres."
                  : "Le catalogue est vide pour le moment."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {result.data.map((product, idx) => (
                  <ScrollReveal key={product.id} delay={idx * 50}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>

              {result.pages > 1 && (
                <div className="mt-10">
                  <CataloguePagination
                    currentPage={result.page}
                    totalPages={result.pages}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
