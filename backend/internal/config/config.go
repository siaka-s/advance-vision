package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config regroupe toutes les variables de configuration de l'application
type Config struct {
	Port string
	Env  string

	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string

	JWTSecret          string
	JWTExpiry          string
	RefreshTokenExpiry string

	UploadDir   string
	MaxFileSize string
}

// Load lit le fichier .env et retourne la configuration
func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		// En production les variables sont injectées directement — pas d'erreur fatale
		fmt.Println("Pas de fichier .env trouvé, utilisation des variables système")
	}

	cfg := &Config{
		Port: getEnv("PORT", "8080"),
		Env:  getEnv("ENV", "development"),

		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBPassword: getEnv("DB_PASSWORD", "password"),
		DBName:     getEnv("DB_NAME", "advance_vision"),

		JWTSecret:          getEnv("JWT_SECRET", ""),
		JWTExpiry:          getEnv("JWT_EXPIRY", "15m"),
		RefreshTokenExpiry: getEnv("REFRESH_TOKEN_EXPIRY", "7d"),

		UploadDir:   getEnv("UPLOAD_DIR", "./uploads"),
		MaxFileSize: getEnv("MAX_FILE_SIZE", "5242880"),
	}

	return cfg, nil
}

// DSN construit l'adresse de connexion à PostgreSQL
func (c *Config) DSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable TimeZone=Africa/Abidjan",
		c.DBHost, c.DBPort, c.DBUser, c.DBPassword, c.DBName,
	)
}

// IsDev retourne true si on est en mode développement
func (c *Config) IsDev() bool {
	return c.Env == "development"
}

// getEnv lit une variable d'environnement, retourne la valeur par défaut si absente
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
