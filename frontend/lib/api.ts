import type {
  APIResponse,
  Brand,
  Category,
  PaginatedProducts,
  Product,
  ProductFilter,
} from '@/types'

// URL de base de l'API — définie dans .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL est manquant dans .env.local')
}

// Fonction utilitaire interne — gère les erreurs HTTP de façon uniforme
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Erreur API ${response.status} : ${endpoint}`)
  }

  const json: APIResponse<T> = await response.json()

  if (!json.success) {
    throw new Error(json.error ?? 'Erreur inconnue')
  }

  return json.data
}

// Convertit un objet de filtres en paramètres d'URL
function buildQueryString(filter: ProductFilter): string {
  const params = new URLSearchParams()

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value))
    }
  })

  const query = params.toString()
  return query ? `?${query}` : ''
}

// ============================================
// Fonctions publiques — utilisées dans les composants
// ============================================

/** Récupère la liste des produits avec filtres et pagination */
export async function getProducts(
  filter: ProductFilter = {}
): Promise<PaginatedProducts> {
  const query = buildQueryString(filter)
  return fetchAPI<PaginatedProducts>(`/products${query}`)
}

/** Récupère le détail d'un produit par son slug */
export async function getProductBySlug(slug: string): Promise<Product> {
  return fetchAPI<Product>(`/products/${slug}`)
}

/** Récupère toutes les catégories */
export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>('/categories')
}

/** Récupère toutes les marques */
export async function getBrands(): Promise<Brand[]> {
  return fetchAPI<Brand[]>('/brands')
}

/** Formate un prix en FCFA — ex: 85000 → "85 000 FCFA" */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
}
