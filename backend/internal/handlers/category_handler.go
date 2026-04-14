package handlers

import (
	"advance-vision/backend/internal/services"

	"github.com/gofiber/fiber/v2"
)

// CategoryHandler regroupe les handlers liés aux catégories
type CategoryHandler struct {
	service services.CategoryService
}

// NewCategoryHandler crée un nouveau handler pour les catégories
func NewCategoryHandler(service services.CategoryService) *CategoryHandler {
	return &CategoryHandler{service: service}
}

// GetCategories répond à GET /api/v1/categories
// Retourne la liste complète des catégories
func (h *CategoryHandler) GetCategories(c *fiber.Ctx) error {
	categories, err := h.service.GetAll()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Impossible de récupérer les catégories",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    categories,
	})
}
