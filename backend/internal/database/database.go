package database

import (
	"log"

	"advance-vision/backend/internal/config"
	"advance-vision/backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB est la connexion globale à la base de données
var DB *gorm.DB

// Connect établit la connexion à PostgreSQL
func Connect(cfg *config.Config) (*gorm.DB, error) {
	// En développement on affiche les requêtes SQL dans le terminal (utile pour déboguer)
	logLevel := logger.Silent
	if cfg.IsDev() {
		logLevel = logger.Info
	}

	db, err := gorm.Open(postgres.Open(cfg.DSN()), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})
	if err != nil {
		return nil, err
	}

	DB = db
	log.Println("Connexion à la base de données établie")
	return db, nil
}

// AutoMigrate crée ou met à jour les tables dans la base de données
func AutoMigrate(db *gorm.DB) error {
	log.Println("Exécution des migrations...")
	err := db.AutoMigrate(
		&models.Category{},
		&models.Brand{},
		&models.LensOption{},
		&models.Product{},
		&models.ProductImage{},
		&models.User{},
	)
	if err != nil {
		return err
	}
	log.Println("Migrations terminées")
	return nil
}
