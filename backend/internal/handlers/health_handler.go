package handlers

import "github.com/gofiber/fiber/v2"

// HealthCheck répond à GET /api/v1/health
// Permet de vérifier que le serveur est opérationnel
func HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"success": true,
		"message": "Advance Vision API opérationnelle",
		"version": "1.0.0",
	})
}
