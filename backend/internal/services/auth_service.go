package services

import (
	"errors"
	"os"
	"time"

	"advance-vision/backend/internal/models"
	"advance-vision/backend/internal/repositories"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// TokenPair contient les deux tokens retournés après connexion ou inscription
type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// AuthService contient la logique métier de l'authentification
type AuthService struct {
	userRepo *repositories.UserRepository
}

// NewAuthService crée un nouveau AuthService
func NewAuthService(userRepo *repositories.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

// RegisterInput représente les données attendues pour l'inscription
type RegisterInput struct {
	FirstName string `json:"first_name" validate:"required,min=2"`
	LastName  string `json:"last_name"  validate:"required,min=2"`
	Email     string `json:"email"      validate:"required,email"`
	Phone     string `json:"phone"      validate:"required,min=8"`
	Password  string `json:"password"   validate:"required,min=8"`
}

// LoginInput représente les données attendues pour la connexion
type LoginInput struct {
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// Register crée un nouveau compte client
func (s *AuthService) Register(input RegisterInput) (*models.User, *TokenPair, error) {
	// Vérifier que l'email n'est pas déjà utilisé
	_, err := s.userRepo.FindByEmail(input.Email)
	if err == nil {
		return nil, nil, errors.New("un compte existe déjà avec cet email")
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, errors.New("erreur lors de la vérification de l'email")
	}

	// Hasher le mot de passe (bcrypt, coût 12)
	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), 12)
	if err != nil {
		return nil, nil, errors.New("erreur lors du chiffrement du mot de passe")
	}

	// Créer l'utilisateur en base
	user := &models.User{
		FirstName:    input.FirstName,
		LastName:     input.LastName,
		Email:        input.Email,
		Phone:        input.Phone,
		PasswordHash: string(hash),
		Role:         models.RoleClient,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, nil, errors.New("erreur lors de la création du compte")
	}

	// Générer les tokens
	tokens, err := generateTokens(user)
	if err != nil {
		return nil, nil, err
	}

	return user, tokens, nil
}

// Login vérifie les credentials et retourne les tokens si valides
func (s *AuthService) Login(input LoginInput) (*models.User, *TokenPair, error) {
	// Chercher l'utilisateur par email
	user, err := s.userRepo.FindByEmail(input.Email)
	if err != nil {
		// Message volontairement vague pour ne pas révéler si l'email existe
		return nil, nil, errors.New("email ou mot de passe incorrect")
	}

	// Vérifier le mot de passe
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		return nil, nil, errors.New("email ou mot de passe incorrect")
	}

	// Générer les tokens
	tokens, err := generateTokens(user)
	if err != nil {
		return nil, nil, err
	}

	return user, tokens, nil
}

// generateTokens crée un access token (15 min) et un refresh token (7 jours)
func generateTokens(user *models.User) (*TokenPair, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	// Access token — courte durée, contient l'ID et le rôle
	accessClaims := jwt.MapClaims{
		"sub":  user.ID,
		"role": user.Role,
		"exp":  time.Now().Add(15 * time.Minute).Unix(),
	}
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessSigned, err := accessToken.SignedString(secret)
	if err != nil {
		return nil, errors.New("erreur lors de la génération du token")
	}

	// Refresh token — longue durée, contient uniquement l'ID
	refreshClaims := jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(7 * 24 * time.Hour).Unix(),
	}
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshSigned, err := refreshToken.SignedString(secret)
	if err != nil {
		return nil, errors.New("erreur lors de la génération du refresh token")
	}

	return &TokenPair{
		AccessToken:  accessSigned,
		RefreshToken: refreshSigned,
	}, nil
}

// ParseAccessToken vérifie et décode un access token
// Retourne l'ID utilisateur et son rôle si le token est valide
func ParseAccessToken(tokenString string) (uint, string, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("méthode de signature invalide")
		}
		return secret, nil
	})

	if err != nil || !token.Valid {
		return 0, "", errors.New("token invalide ou expiré")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, "", errors.New("token malformé")
	}

	// Extraire l'ID (stocké comme float64 dans JWT)
	subFloat, ok := claims["sub"].(float64)
	if !ok {
		return 0, "", errors.New("token malformé")
	}

	role, ok := claims["role"].(string)
	if !ok {
		return 0, "", errors.New("token malformé")
	}

	return uint(subFloat), role, nil
}
