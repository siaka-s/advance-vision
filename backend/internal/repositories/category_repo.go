package repositories

import (
	"advance-vision/backend/internal/models"

	"gorm.io/gorm"
)

// CategoryRepository définit les opérations disponibles sur les catégories
type CategoryRepository interface {
	FindAll() ([]models.Category, error)
	FindByID(id uint) (*models.Category, error)
	FindBySlug(slug string) (*models.Category, error)
}

// categoryRepository est l'implémentation concrète (utilise GORM pour parler à PostgreSQL)
type categoryRepository struct {
	db *gorm.DB
}

// NewCategoryRepository crée un nouveau repository pour les catégories
func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

// FindAll récupère toutes les catégories
func (r *categoryRepository) FindAll() ([]models.Category, error) {
	var categories []models.Category
	if err := r.db.Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

// FindByID récupère une catégorie par son ID
func (r *categoryRepository) FindByID(id uint) (*models.Category, error) {
	var category models.Category
	if err := r.db.First(&category, id).Error; err != nil {
		return nil, err
	}
	return &category, nil
}

// FindBySlug récupère une catégorie par son slug (ex: "lunettes-de-vue")
func (r *categoryRepository) FindBySlug(slug string) (*models.Category, error) {
	var category models.Category
	if err := r.db.Where("slug = ?", slug).First(&category).Error; err != nil {
		return nil, err
	}
	return &category, nil
}
