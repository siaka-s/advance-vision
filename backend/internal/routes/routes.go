package routes

import (
	"advance-vision/backend/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

// Handlers regroupe tous les handlers de l'application
type Handlers struct {
	Health   func(*fiber.Ctx) error
	Category *handlers.CategoryHandler
	Brand    *handlers.BrandHandler
	Product  *handlers.ProductHandler
}

// Setup enregistre toutes les routes de l'API
func Setup(app *fiber.App, h *Handlers) {
	// Toutes les routes sont préfixées par /api/v1
	api := app.Group("/api/v1")

	// Santé de l'API
	api.Get("/health", h.Health)

	// Catalogue public — accessible sans connexion
	api.Get("/categories", h.Category.GetCategories)
	api.Get("/brands", h.Brand.GetBrands)
	api.Get("/products", h.Product.GetProducts)
	api.Get("/products/:slug", h.Product.GetProductBySlug)
}
