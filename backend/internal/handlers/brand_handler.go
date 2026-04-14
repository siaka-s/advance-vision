package handlers

import (
	"advance-vision/backend/internal/services"

	"github.com/gofiber/fiber/v2"
)

// BrandHandler regroupe les handlers liés aux marques
type BrandHandler struct {
	service services.BrandService
}

// NewBrandHandler crée un nouveau handler pour les marques
func NewBrandHandler(service services.BrandService) *BrandHandler {
	return &BrandHandler{service: service}
}

// GetBrands répond à GET /api/v1/brands
// Retourne la liste complète des marques
func (h *BrandHandler) GetBrands(c *fiber.Ctx) error {
	brands, err := h.service.GetAll()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Impossible de récupérer les marques",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    brands,
	})
}
