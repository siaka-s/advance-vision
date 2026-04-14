package models

import "gorm.io/gorm"

// Constantes pour le champ Gender — évite les fautes de frappe dans le code
const (
	GenderHomme  = "homme"
	GenderFemme  = "femme"
	GenderEnfant = "enfant"
	GenderMixte  = "mixte"
)

// Product représente une monture de lunettes dans le catalogue
type Product struct {
	gorm.Model          // Ajoute automatiquement : ID, CreatedAt, UpdatedAt, DeletedAt
	Name        string  `json:"name" gorm:"not null"`
	Slug        string  `json:"slug" gorm:"not null;uniqueIndex"`
	Description string  `json:"description"`
	Price       uint    `json:"price" gorm:"not null"` // Toujours en FCFA, jamais de décimales

	// Références vers les autres tables
	CategoryID uint     `json:"category_id"`
	Category   Category `json:"category" gorm:"foreignKey:CategoryID"`
	BrandID    uint     `json:"brand_id"`
	Brand      Brand    `json:"brand" gorm:"foreignKey:BrandID"`

	// Caractéristiques physiques de la monture
	Gender     string `json:"gender" gorm:"type:varchar(20)"`      // homme, femme, enfant, mixte
	FrameShape string `json:"frame_shape" gorm:"type:varchar(50)"` // ronde, carrée, aviateur, rectangle, papillon...
	Material   string `json:"material" gorm:"type:varchar(50)"`    // métal, acétate, titane, plastique...
	FrameColor string `json:"frame_color" gorm:"type:varchar(50)"`

	// Stock et visibilité
	StockQty    uint `json:"stock_qty" gorm:"default:0"`
	IsAvailable bool `json:"is_available" gorm:"default:true"`  // Visible sur le site ou non
	IsFeatured  bool `json:"is_featured" gorm:"default:false"`  // Mis en avant sur la page d'accueil

	// Relations
	Images      []ProductImage `json:"images" gorm:"foreignKey:ProductID"`
	LensOptions []LensOption   `json:"lens_options" gorm:"many2many:product_lens_options"`
}

// ProductImage représente une photo d'un produit
// Un produit peut avoir plusieurs photos (multi-angles)
type ProductImage struct {
	gorm.Model
	ProductID uint   `json:"product_id" gorm:"not null;index"`
	URL       string `json:"url" gorm:"not null"`
	Position  uint   `json:"position" gorm:"default:0"` // Ordre d'affichage (0 = photo principale)
}

// ProductFilter regroupe tous les filtres disponibles pour GET /api/v1/products
type ProductFilter struct {
	Page       int    `query:"page"`
	Limit      int    `query:"limit"`
	CategoryID uint   `query:"category_id"`
	BrandID    uint   `query:"brand_id"`
	Gender     string `query:"gender"`
	FrameShape string `query:"frame_shape"`
	Material   string `query:"material"`
	FrameColor string `query:"frame_color"`
	PriceMin   uint   `query:"price_min"`
	PriceMax   uint   `query:"price_max"`
	IsFeatured *bool  `query:"is_featured"` // Pointeur pour distinguer "non fourni" de "false"
	Search     string `query:"search"`      // Recherche textuelle sur nom et description
}
