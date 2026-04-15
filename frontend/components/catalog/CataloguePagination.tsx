"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface CataloguePaginationProps {
  currentPage: number
  totalPages: number
}

export default function CataloguePagination({ currentPage, totalPages }: CataloguePaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`/catalogue?${params.toString()}`)
  }

  // Génère la liste des numéros de pages à afficher
  const pages: (number | "...")[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push("...")
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push("...")
    pages.push(totalPages)
  }

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Précédent */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm rounded-lg border border-surface-border text-ink-muted hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Page précédente"
      >
        ←
      </button>

      {/* Numéros */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-sm text-ink-muted">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page as number)}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              page === currentPage
                ? "bg-primary border-primary text-white font-semibold"
                : "border-surface-border text-ink hover:bg-surface"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Suivant */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm rounded-lg border border-surface-border text-ink-muted hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Page suivante"
      >
        →
      </button>
    </nav>
  )
}
