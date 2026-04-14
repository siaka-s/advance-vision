package repositories

import (
	"advance-vision/backend/internal/models"

	"gorm.io/gorm"
)

// BrandRepository définit les opérations disponibles sur les marques
type BrandRepository interface {
	FindAll() ([]models.Brand, error)
	FindByID(id uint) (*models.Brand, error)
	FindBySlug(slug string) (*models.Brand, error)
}

// brandRepository est l'implémentation concrète
type brandRepository struct {
	db *gorm.DB
}

// NewBrandRepository crée un nouveau repository pour les marques
func NewBrandRepository(db *gorm.DB) BrandRepository {
	return &brandRepository{db: db}
}

// FindAll récupère toutes les marques
func (r *brandRepository) FindAll() ([]models.Brand, error) {
	var brands []models.Brand
	if err := r.db.Find(&brands).Error; err != nil {
		return nil, err
	}
	return brands, nil
}

// FindByID récupère une marque par son ID
func (r *brandRepository) FindByID(id uint) (*models.Brand, error) {
	var brand models.Brand
	if err := r.db.First(&brand, id).Error; err != nil {
		return nil, err
	}
	return &brand, nil
}

// FindBySlug récupère une marque par son slug (ex: "ray-ban")
func (r *brandRepository) FindBySlug(slug string) (*models.Brand, error) {
	var brand models.Brand
	if err := r.db.Where("slug = ?", slug).First(&brand).Error; err != nil {
		return nil, err
	}
	return &brand, nil
}
