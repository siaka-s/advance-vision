package models

import "gorm.io/gorm"

// Category représente une catégorie de produits (lunettes de vue, solaires, sport, luxe)
type Category struct {
	gorm.Model          // Ajoute automatiquement : ID, CreatedAt, UpdatedAt, DeletedAt
	Name        string  `json:"name" gorm:"not null;uniqueIndex"`
	Slug        string  `json:"slug" gorm:"not null;uniqueIndex"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`

	// Une catégorie peut avoir plusieurs produits
	Products []Product `json:"products,omitempty" gorm:"foreignKey:CategoryID"`
}
