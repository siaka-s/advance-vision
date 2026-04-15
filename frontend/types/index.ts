// ============================================
// ADVANCE VISION — Types TypeScript
// Correspondent exactement aux modèles Go du backend
// ============================================

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image_url: string
  created_at: string
  updated_at: string
}

export interface Brand {
  id: number
  name: string
  slug: string
  description: string
  logo_url: string
  created_at: string
  updated_at: string
}

export interface LensOption {
  id: number
  name: string
  description: string
  price_addition: number // Supplément en FCFA
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: number
  product_id: number
  url: string
  position: number
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number // Toujours en FCFA
  category_id: number
  category: Category
  brand_id: number
  brand: Brand
  gender: 'homme' | 'femme' | 'enfant' | 'mixte'
  frame_shape: string
  material: string
  frame_color: string
  stock_qty: number
  is_available: boolean
  is_featured: boolean
  images: ProductImage[]
  lens_options: LensOption[]
  created_at: string
  updated_at: string
}

// Réponse paginée de GET /api/v1/products
export interface PaginatedProducts {
  total: number
  page: number
  pages: number
  data: Product[]
}

// Format standard de toutes les réponses de l'API
export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// Filtres disponibles pour la page catalogue
export interface ProductFilter {
  page?: number
  limit?: number
  category_id?: number
  brand_id?: number
  gender?: string
  frame_shape?: string
  material?: string
  frame_color?: string
  price_min?: number
  price_max?: number
  is_featured?: boolean
  search?: string
}
