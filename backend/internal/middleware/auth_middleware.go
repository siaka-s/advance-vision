package middleware

import (
	"strings"

	"advance-vision/backend/internal/services"

	"github.com/gofiber/fiber/v2"
)

// RequireAuth vérifie que la requête contient un token JWT valide.
// Si valide, injecte l'ID et le rôle de l'utilisateur dans le contexte Fiber.
func RequireAuth() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Chercher le token dans le header Authorization: Bearer <token>
		authHeader := c.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"error":   "Token manquant ou invalide",
			})
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		// Vérifier et décoder le token
		userID, role, err := services.ParseAccessToken(tokenString)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"error":   "Token invalide ou expiré",
			})
		}

		// Injecter les infos dans le contexte pour les handlers suivants
		c.Locals("userID", userID)
		c.Locals("userRole", role)

		return c.Next()
	}
}

// RequireRole vérifie que l'utilisateur connecté possède l'un des rôles autorisés.
// Doit être utilisé après RequireAuth.
// Exemple : RequireRole("admin") ou RequireRole("admin", "opticien")
func RequireRole(roles ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		userRole, ok := c.Locals("userRole").(string)
		if !ok || userRole == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"error":   "Non authentifié",
			})
		}

		for _, role := range roles {
			if userRole == role {
				return c.Next()
			}
		}

		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"success": false,
			"error":   "Accès refusé — permissions insuffisantes",
		})
	}
}
