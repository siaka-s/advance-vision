package handlers

import (
	"advance-vision/backend/internal/models"
	"advance-vision/backend/internal/services"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// ProductHandler regroupe les handlers liés aux produits
type ProductHandler struct {
	service services.ProductService
}

// NewProductHandler crée un nouveau handler pour les produits
func NewProductHandler(service services.ProductService) *ProductHandler {
	return &ProductHandler{service: service}
}

// GetProducts répond à GET /api/v1/products
// Accepte des filtres en paramètres d'URL : ?gender=femme&price_max=50000&page=1
func (h *ProductHandler) GetProducts(c *fiber.Ctx) error {
	var filter models.ProductFilter

	// Fiber lit automatiquement les paramètres d'URL et les place dans la struct filter
	if err := c.QueryParser(&filter); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Paramètres de filtre invalides",
		})
	}

	result, err := h.service.GetAll(filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Impossible de récupérer les produits",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    result,
	})
}

// GetProductBySlug répond à GET /api/v1/products/:slug
// Retourne le détail complet d'un produit (avec catégorie, marque, images, options de verres)
func (h *ProductHandler) GetProductBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug") // Extrait le slug de l'URL, ex: "ray-ban-aviator-classic"

	product, err := h.service.GetBySlug(slug)
	if err != nil {
		// Si le produit n'existe pas → erreur 404 (introuvable)
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"success": false,
				"error":   "Produit introuvable",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Impossible de récupérer le produit",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    product,
	})
}
