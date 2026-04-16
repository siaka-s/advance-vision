package repositories

import (
	"advance-vision/backend/internal/models"

	"gorm.io/gorm"
)

// UserRepository gère toutes les opérations base de données liées aux utilisateurs
type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository crée un nouveau UserRepository avec la connexion DB
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

// Create insère un nouvel utilisateur en base de données
func (r *UserRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

// FindByEmail recherche un utilisateur par son adresse email
// Retourne gorm.ErrRecordNotFound si aucun utilisateur trouvé
func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// FindByID recherche un utilisateur par son ID
func (r *UserRepository) FindByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
