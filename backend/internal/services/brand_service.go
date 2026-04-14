package services

import (
	"advance-vision/backend/internal/models"
	"advance-vision/backend/internal/repositories"
)

// BrandService définit les opérations métier disponibles pour les marques
type BrandService interface {
	GetAll() ([]models.Brand, error)
	GetBySlug(slug string) (*models.Brand, error)
}

// brandService est l'implémentation concrète
type brandService struct {
	repo repositories.BrandRepository
}

// NewBrandService crée un nouveau service pour les marques
func NewBrandService(repo repositories.BrandRepository) BrandService {
	return &brandService{repo: repo}
}

// GetAll retourne toutes les marques
func (s *brandService) GetAll() ([]models.Brand, error) {
	return s.repo.FindAll()
}

// GetBySlug retourne une marque par son slug
func (s *brandService) GetBySlug(slug string) (*models.Brand, error) {
	return s.repo.FindBySlug(slug)
}
