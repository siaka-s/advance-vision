package models

import "gorm.io/gorm"

// Rôles disponibles dans l'application
const (
	RoleClient   = "client"
	RoleAdmin    = "admin"
	RoleOpticien = "opticien"
	RoleLivreur  = "livreur"
)

// User représente un utilisateur de la plateforme
type User struct {
	gorm.Model
	FirstName    string `gorm:"not null"                json:"first_name"`
	LastName     string `gorm:"not null"                json:"last_name"`
	Email        string `gorm:"uniqueIndex;not null"    json:"email"`
	Phone        string `gorm:"not null"                json:"phone"`
	PasswordHash string `gorm:"not null"                json:"-"`       // "-" = jamais exposé en JSON
	Role         string `gorm:"not null;default:client" json:"role"`
}
