package services

import (
	"advance-vision/backend/internal/models"
	"advance-vision/backend/internal/repositories"
)

// CategoryService définit les opérations métier disponibles pour les catégories
type CategoryService interface {
	GetAll() ([]models.Category, error)
	GetBySlug(slug string) (*models.Category, error)
}

// categoryService est l'implémentation concrète
type categoryService struct {
	repo repositories.CategoryRepository
}

// NewCategoryService crée un nouveau service pour les catégories
func NewCategoryService(repo repositories.CategoryRepository) CategoryService {
	return &categoryService{repo: repo}
}

// GetAll retourne toutes les catégories
func (s *categoryService) GetAll() ([]models.Category, error) {
	return s.repo.FindAll()
}

// GetBySlug retourne une catégorie par son slug
func (s *categoryService) GetBySlug(slug string) (*models.Category, error) {
	return s.repo.FindBySlug(slug)
}
