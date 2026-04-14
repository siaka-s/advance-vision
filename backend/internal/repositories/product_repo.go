package repositories

import (
	"advance-vision/backend/internal/models"

	"gorm.io/gorm"
)

// PaginatedProducts structure la réponse paginée pour la liste des produits
type PaginatedProducts struct {
	Total int64            `json:"total"` // Nombre total de produits correspondant aux filtres
	Page  int              `json:"page"`  // Page courante
	Pages int              `json:"pages"` // Nombre total de pages
	Data  []models.Product `json:"data"`  // Les produits de cette page
}

// ProductRepository définit les opérations disponibles sur les produits
type ProductRepository interface {
	FindAll(filter models.ProductFilter) (*PaginatedProducts, error)
	FindBySlug(slug string) (*models.Product, error)
	FindByID(id uint) (*models.Product, error)
}

// productRepository est l'implémentation concrète
type productRepository struct {
	db *gorm.DB
}

// NewProductRepository crée un nouveau repository pour les produits
func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{db: db}
}

// FindAll récupère les produits avec filtres et pagination
func (r *productRepository) FindAll(filter models.ProductFilter) (*PaginatedProducts, error) {
	// Valeurs par défaut pour la pagination
	page := filter.Page
	if page < 1 {
		page = 1
	}
	limit := filter.Limit
	if limit < 1 || limit > 100 {
		limit = 20
	}
	offset := (page - 1) * limit // Ex: page 2, limit 20 → on saute les 20 premiers

	// Construction de la requête de base avec chargement des relations
	query := r.db.Model(&models.Product{}).
		Preload("Category").  // Charge la catégorie liée à chaque produit
		Preload("Brand").     // Charge la marque liée à chaque produit
		Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("position ASC") // Photos triées par position
		}).
		Preload("LensOptions") // Charge les options de verres disponibles

	// Application des filtres selon ce qui est fourni dans l'URL
	if filter.CategoryID > 0 {
		query = query.Where("category_id = ?", filter.CategoryID)
	}
	if filter.BrandID > 0 {
		query = query.Where("brand_id = ?", filter.BrandID)
	}
	if filter.Gender != "" {
		query = query.Where("gender = ?", filter.Gender)
	}
	if filter.FrameShape != "" {
		query = query.Where("frame_shape = ?", filter.FrameShape)
	}
	if filter.Material != "" {
		query = query.Where("material = ?", filter.Material)
	}
	if filter.FrameColor != "" {
		query = query.Where("frame_color = ?", filter.FrameColor)
	}
	if filter.PriceMin > 0 {
		query = query.Where("price >= ?", filter.PriceMin)
	}
	if filter.PriceMax > 0 {
		query = query.Where("price <= ?", filter.PriceMax)
	}
	if filter.IsFeatured != nil {
		query = query.Where("is_featured = ?", *filter.IsFeatured)
	}
	if filter.Search != "" {
		// ILIKE = recherche insensible à la casse en PostgreSQL
		search := "%" + filter.Search + "%"
		query = query.Where("name ILIKE ? OR description ILIKE ?", search, search)
	}

	// Compter le total avant la pagination (pour calculer le nombre de pages)
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, err
	}

	// Récupérer les produits de la page demandée
	var products []models.Product
	if err := query.Offset(offset).Limit(limit).Find(&products).Error; err != nil {
		return nil, err
	}

	// Calcul du nombre total de pages
	pages := int(total) / limit
	if int(total)%limit != 0 {
		pages++
	}

	return &PaginatedProducts{
		Total: total,
		Page:  page,
		Pages: pages,
		Data:  products,
	}, nil
}

// FindBySlug récupère un produit par son slug avec toutes ses relations
func (r *productRepository) FindBySlug(slug string) (*models.Product, error) {
	var product models.Product
	err := r.db.
		Preload("Category").
		Preload("Brand").
		Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("position ASC")
		}).
		Preload("LensOptions").
		Where("slug = ? AND is_available = true", slug).
		First(&product).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}

// FindByID récupère un produit par son ID
func (r *productRepository) FindByID(id uint) (*models.Product, error) {
	var product models.Product
	err := r.db.
		Preload("Category").
		Preload("Brand").
		Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("position ASC")
		}).
		Preload("LensOptions").
		First(&product, id).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}
