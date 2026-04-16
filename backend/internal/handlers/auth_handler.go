package handlers

import (
	"time"

	"advance-vision/backend/internal/repositories"
	"advance-vision/backend/internal/services"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

// AuthHandler regroupe les handlers liés à l'authentification
type AuthHandler struct {
	authService *services.AuthService
	userRepo    *repositories.UserRepository
	validate    *validator.Validate
}

// NewAuthHandler crée un nouveau AuthHandler
func NewAuthHandler(authService *services.AuthService, userRepo *repositories.UserRepository) *AuthHandler {
	return &AuthHandler{
		authService: authService,
		userRepo:    userRepo,
		validate:    validator.New(),
	}
}

// Register gère POST /api/v1/auth/register
func (h *AuthHandler) Register(c *fiber.Ctx) error {
	var input services.RegisterInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Données invalides",
		})
	}

	if err := h.validate.Struct(input); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"success": false,
			"error":   "Veuillez remplir tous les champs correctement",
		})
	}

	user, tokens, err := h.authService.Register(input)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}

	// Stocker les tokens dans des cookies httpOnly (inaccessibles au JavaScript)
	setAuthCookies(c, tokens)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Compte créé avec succès",
		"data": fiber.Map{
			"id":         user.ID,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"email":      user.Email,
			"phone":      user.Phone,
			"role":       user.Role,
		},
	})
}

// Login gère POST /api/v1/auth/login
func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var input services.LoginInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Données invalides",
		})
	}

	if err := h.validate.Struct(input); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"success": false,
			"error":   "Email et mot de passe requis",
		})
	}

	user, tokens, err := h.authService.Login(input)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}

	setAuthCookies(c, tokens)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "Connexion réussie",
		"data": fiber.Map{
			"id":         user.ID,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"email":      user.Email,
			"phone":      user.Phone,
			"role":       user.Role,
		},
	})
}

// Logout gère POST /api/v1/auth/logout
func (h *AuthHandler) Logout(c *fiber.Ctx) error {
	// Effacer les cookies en les mettant à expiration passée
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		HTTPOnly: true,
		SameSite: "Lax",
	})
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		HTTPOnly: true,
		SameSite: "Lax",
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "Déconnexion réussie",
	})
}

// Me gère GET /api/v1/users/me — retourne le profil de l'utilisateur connecté
func (h *AuthHandler) Me(c *fiber.Ctx) error {
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"success": false,
			"error":   "Non authentifié",
		})
	}

	user, err := h.userRepo.FindByID(userID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"error":   "Utilisateur introuvable",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"id":         user.ID,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"email":      user.Email,
			"phone":      user.Phone,
			"role":       user.Role,
		},
	})
}

// setAuthCookies place les tokens dans des cookies httpOnly sécurisés
func setAuthCookies(c *fiber.Ctx, tokens *services.TokenPair) {
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    tokens.AccessToken,
		Expires:  time.Now().Add(15 * time.Minute),
		HTTPOnly: true, // JavaScript ne peut pas lire ce cookie
		SameSite: "Lax",
	})
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    tokens.RefreshToken,
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		HTTPOnly: true,
		SameSite: "Lax",
	})
}
