package models

import "gorm.io/gorm"

// LensOption représente un type de verre disponible à la commande
// Exemples : unifocal, progressif, anti-lumière bleue...
type LensOption struct {
	gorm.Model            // Ajoute automatiquement : ID, CreatedAt, UpdatedAt, DeletedAt
	Name          string  `json:"name" gorm:"not null;uniqueIndex"`
	Description   string  `json:"description"`
	PriceAddition uint    `json:"price_addition" gorm:"default:0"` // Supplément en FCFA

	// Une option de verre peut être liée à plusieurs produits (et vice versa)
	// GORM crée automatiquement la table intermédiaire "product_lens_options"
	Products []Product `json:"products,omitempty" gorm:"many2many:product_lens_options"`
}
