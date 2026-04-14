package services

import (
	"advance-vision/backend/internal/models"
	"advance-vision/backend/internal/repositories"
)

// ProductService définit les opérations métier disponibles pour les produits
type ProductService interface {
	GetAll(filter models.ProductFilter) (*repositories.PaginatedProducts, error)
	GetBySlug(slug string) (*models.Product, error)
}

// productService est l'implémentation concrète
type productService struct {
	repo repositories.ProductRepository
}

// NewProductService crée un nouveau service pour les produits
func NewProductService(repo repositories.ProductRepository) ProductService {
	return &productService{repo: repo}
}

// GetAll retourne les produits filtrés et paginés
func (s *productService) GetAll(filter models.ProductFilter) (*repositories.PaginatedProducts, error) {
	return s.repo.FindAll(filter)
}

// GetBySlug retourne un produit par son slug
func (s *productService) GetBySlug(slug string) (*models.Product, error) {
	return s.repo.FindBySlug(slug)
}
