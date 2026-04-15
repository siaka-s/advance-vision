"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import type { Brand, Category } from "@/types"

interface CatalogueFiltersProps {
  categories: Category[]
  brands: Brand[]
}

const genders = [
  { value: "", label: "Tous" },
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "enfant", label: "Enfant" },
  { value: "mixte", label: "Mixte" },
]

const priceRanges = [
  { value: "", label: "Tous les prix" },
  { value: "0-25000", label: "Moins de 25 000 FCFA" },
  { value: "25000-75000", label: "25 000 – 75 000 FCFA" },
  { value: "75000-150000", label: "75 000 – 150 000 FCFA" },
  { value: "150000-999999", label: "Plus de 150 000 FCFA" },
]

export default function CatalogueFilters({ categories, brands }: CatalogueFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Met à jour un paramètre dans l'URL sans perdre les autres
  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page") // Revenir à la page 1 quand on filtre
      router.push(`/catalogue?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handlePriceRange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      const [min, max] = value.split("-")
      params.set("price_min", min)
      params.set("price_max", max)
    } else {
      params.delete("price_min")
      params.delete("price_max")
    }
    params.delete("page")
    router.push(`/catalogue?${params.toString()}`)
  }

  const clearAll = () => router.push("/catalogue")

  const hasActiveFilters = searchParams.toString() !== ""

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white-pure border border-surface-border rounded-xl p-5 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-ink-soft">Filtres</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-primary hover:underline"
            >
              Tout effacer
            </button>
          )}
        </div>

        {/* Catégorie */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
            Catégorie
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value=""
                checked={!searchParams.get("category_id")}
                onChange={() => updateFilter("category_id", "")}
                className="accent-primary"
              />
              <span className="text-sm text-ink">Toutes</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={searchParams.get("category_id") === String(cat.id)}
                  onChange={() => updateFilter("category_id", String(cat.id))}
                  className="accent-primary"
                />
                <span className="text-sm text-ink">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-surface-border mb-6" />

        {/* Genre */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
            Genre
          </h3>
          <div className="space-y-2">
            {genders.map((g) => (
              <label key={g.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g.value}
                  checked={(searchParams.get("gender") ?? "") === g.value}
                  onChange={() => updateFilter("gender", g.value)}
                  className="accent-primary"
                />
                <span className="text-sm text-ink">{g.label}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-surface-border mb-6" />

        {/* Prix */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
            Prix
          </h3>
          <div className="space-y-2">
            {priceRanges.map((range) => {
              const [min, max] = range.value ? range.value.split("-") : ["", ""]
              const isActive =
                searchParams.get("price_min") === min &&
                searchParams.get("price_max") === max
              return (
                <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value={range.value}
                    checked={range.value === "" ? !searchParams.get("price_min") : isActive}
                    onChange={() => handlePriceRange(range.value)}
                    className="accent-primary"
                  />
                  <span className="text-sm text-ink">{range.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <hr className="border-surface-border mb-6" />

        {/* Marque */}
        <div>
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
            Marque
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                value=""
                checked={!searchParams.get("brand_id")}
                onChange={() => updateFilter("brand_id", "")}
                className="accent-primary"
              />
              <span className="text-sm text-ink">Toutes</span>
            </label>
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  value={brand.id}
                  checked={searchParams.get("brand_id") === String(brand.id)}
                  onChange={() => updateFilter("brand_id", String(brand.id))}
                  className="accent-primary"
                />
                <span className="text-sm text-ink">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
