package middleware

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
)

// Logger affiche dans le terminal chaque requête reçue par le serveur
// Exemple : [GET] /api/v1/products 127.0.0.1 | 200 | 3ms
func Logger() fiber.Handler {
	return func(c *fiber.Ctx) error {
		start := time.Now() // On note l'heure de début

		err := c.Next() // On laisse passer la requête vers le handler

		// Après la réponse, on affiche les infos
		duration := time.Since(start)
		status := c.Response().StatusCode()

		log.Printf("[%s] %s %s | %d | %s",
			c.Method(),   // GET, POST, PUT, DELETE...
			c.Path(),     // /api/v1/products
			c.IP(),       // Adresse IP du client
			status,       // 200, 404, 500...
			duration,     // Temps de traitement
		)

		return err
	}
}
