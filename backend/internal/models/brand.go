package models

import "gorm.io/gorm"

// Brand représente une marque de lunettes (Ray-Ban, Oakley, Carrera...)
type Brand struct {
	gorm.Model          // Ajoute automatiquement : ID, CreatedAt, UpdatedAt, DeletedAt
	Name        string  `json:"name" gorm:"not null;uniqueIndex"`
	Slug        string  `json:"slug" gorm:"not null;uniqueIndex"`
	Description string  `json:"description"`
	LogoURL     string  `json:"logo_url"`

	// Une marque peut avoir plusieurs produits
	Products []Product `json:"products,omitempty" gorm:"foreignKey:BrandID"`
}
