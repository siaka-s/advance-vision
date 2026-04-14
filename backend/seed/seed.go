package seed

import (
	"log"

	"advance-vision/backend/internal/models"

	"gorm.io/gorm"
)

func Run(db *gorm.DB) {
	log.Println("Démarrage du seed...")

	// --- Catégories ---
	categories := []models.Category{
		{Name: "Lunettes de vue", Slug: "lunettes-de-vue", Description: "Montures optiques correctrices"},
		{Name: "Lunettes solaires", Slug: "lunettes-solaires", Description: "Protection solaire et style"},
		{Name: "Lunettes de sport", Slug: "lunettes-de-sport", Description: "Performances et protection pour le sport"},
		{Name: "Lunettes de luxe", Slug: "lunettes-de-luxe", Description: "Collections premium et haute couture"},
	}
	for i := range categories {
		db.FirstOrCreate(&categories[i], models.Category{Slug: categories[i].Slug})
	}

	// --- Marques ---
	brands := []models.Brand{
		{Name: "Ray-Ban", Slug: "ray-ban", Description: "Icône américaine de l'eyewear"},
		{Name: "Oakley", Slug: "oakley", Description: "Performance et innovation sportive"},
		{Name: "Carrera", Slug: "carrera", Description: "Style européen et sportif"},
		{Name: "Silhouette", Slug: "silhouette", Description: "Légèreté et élégance autrichienne"},
		{Name: "Advance Vision", Slug: "advance-vision", Description: "Notre marque maison"},
	}
	for i := range brands {
		db.FirstOrCreate(&brands[i], models.Brand{Slug: brands[i].Slug})
	}

	// --- Options de verres ---
	lensOptions := []models.LensOption{
		{Name: "Unifocal", Description: "Correction simple — myopie ou hypermétropie", PriceAddition: 15000},
		{Name: "Progressif", Description: "Correction progressive pour toutes distances", PriceAddition: 45000},
		{Name: "Anti-lumière bleue", Description: "Protection contre les écrans", PriceAddition: 20000},
		{Name: "Photochromique", Description: "Verres qui s'adaptent à la luminosité", PriceAddition: 35000},
		{Name: "Polarisant", Description: "Réduit les reflets en extérieur", PriceAddition: 25000},
	}
	for i := range lensOptions {
		db.FirstOrCreate(&lensOptions[i], models.LensOption{Name: lensOptions[i].Name})
	}

	// Récupérer les enregistrements créés pour avoir leurs IDs
	var catVue, catSolaire, catSport, catLuxe models.Category
	var brandRayBan, brandOakley, brandCarrera, brandSilhouette, brandAV models.Brand
	var allLensOptions []models.LensOption

	db.Where("slug = ?", "lunettes-de-vue").First(&catVue)
	db.Where("slug = ?", "lunettes-solaires").First(&catSolaire)
	db.Where("slug = ?", "lunettes-de-sport").First(&catSport)
	db.Where("slug = ?", "lunettes-de-luxe").First(&catLuxe)
	db.Where("slug = ?", "ray-ban").First(&brandRayBan)
	db.Where("slug = ?", "oakley").First(&brandOakley)
	db.Where("slug = ?", "carrera").First(&brandCarrera)
	db.Where("slug = ?", "silhouette").First(&brandSilhouette)
	db.Where("slug = ?", "advance-vision").First(&brandAV)
	db.Find(&allLensOptions)

	// --- Produits ---
	products := []models.Product{
		{
			Name:        "Ray-Ban Aviator Classic",
			Slug:        "ray-ban-aviator-classic",
			Description: "L'iconique monture aviateur Ray-Ban. Style intemporel, confort optimal.",
			Price:       85000,
			CategoryID:  catSolaire.ID,
			BrandID:     brandRayBan.ID,
			Gender:      models.GenderMixte,
			FrameShape:  "aviateur",
			Material:    "métal",
			FrameColor:  "or",
			StockQty:    15,
			IsAvailable: true,
			IsFeatured:  true,
		},
		{
			Name:        "Ray-Ban Wayfarer",
			Slug:        "ray-ban-wayfarer",
			Description: "La monture Wayfarer, emblème du style casual et moderne. Acétate léger et résistant.",
			Price:       78000,
			CategoryID:  catSolaire.ID,
			BrandID:     brandRayBan.ID,
			Gender:      models.GenderMixte,
			FrameShape:  "carrée",
			Material:    "acétate",
			FrameColor:  "noir",
			StockQty:    20,
			IsAvailable: true,
			IsFeatured:  true,
		},
		{
			Name:        "Oakley Holbrook",
			Slug:        "oakley-holbrook",
			Description: "Monture solaire sport Oakley. Protection UV400, design renforcé pour une utilisation active.",
			Price:       95000,
			CategoryID:  catSport.ID,
			BrandID:     brandOakley.ID,
			Gender:      models.GenderHomme,
			FrameShape:  "rectangle",
			Material:    "acétate",
			FrameColor:  "noir mat",
			StockQty:    10,
			IsAvailable: true,
			IsFeatured:  false,
		},
		{
			Name:        "Carrera Champion Vue",
			Slug:        "carrera-champion-vue",
			Description: "Monture optique Carrera au design sportif et élégant. Idéale pour une correction quotidienne.",
			Price:       55000,
			CategoryID:  catVue.ID,
			BrandID:     brandCarrera.ID,
			Gender:      models.GenderHomme,
			FrameShape:  "rectangle",
			Material:    "métal",
			FrameColor:  "argent",
			StockQty:    12,
			IsAvailable: true,
			IsFeatured:  true,
		},
		{
			Name:        "Silhouette Momentum",
			Slug:        "silhouette-momentum",
			Description: "Monture optique ultra-légère Silhouette. À peine 1,8g — vous oubliez de les porter.",
			Price:       120000,
			CategoryID:  catVue.ID,
			BrandID:     brandSilhouette.ID,
			Gender:      models.GenderFemme,
			FrameShape:  "ovale",
			Material:    "titane",
			FrameColor:  "rose gold",
			StockQty:    8,
			IsAvailable: true,
			IsFeatured:  true,
		},
		{
			Name:        "Advance Vision Classic Homme",
			Slug:        "advance-vision-classic-homme",
			Description: "Monture optique maison Advance Vision. Rapport qualité-prix exceptionnel pour la correction visuelle.",
			Price:       25000,
			CategoryID:  catVue.ID,
			BrandID:     brandAV.ID,
			Gender:      models.GenderHomme,
			FrameShape:  "rectangle",
			Material:    "acétate",
			FrameColor:  "noir",
			StockQty:    30,
			IsAvailable: true,
			IsFeatured:  false,
		},
		{
			Name:        "Advance Vision Papillon Femme",
			Slug:        "advance-vision-papillon-femme",
			Description: "Monture papillon tendance pour femme. Légère et féminine, parfaite pour toutes les morphologies.",
			Price:       22000,
			CategoryID:  catVue.ID,
			BrandID:     brandAV.ID,
			Gender:      models.GenderFemme,
			FrameShape:  "papillon",
			Material:    "acétate",
			FrameColor:  "bordeaux",
			StockQty:    25,
			IsAvailable: true,
			IsFeatured:  false,
		},
		{
			Name:        "Ray-Ban Hexagonal Luxe",
			Slug:        "ray-ban-hexagonal-luxe",
			Description: "Monture hexagonale Ray-Ban en métal doré. Collection premium pour un style distinctif.",
			Price:       195000,
			CategoryID:  catLuxe.ID,
			BrandID:     brandRayBan.ID,
			Gender:      models.GenderMixte,
			FrameShape:  "hexagone",
			Material:    "métal",
			FrameColor:  "or",
			StockQty:    5,
			IsAvailable: true,
			IsFeatured:  true,
		},
		{
			Name:        "Oakley Radar EV Sport",
			Slug:        "oakley-radar-ev-sport",
			Description: "Lunettes de sport Oakley Radar EV. Technologie Prizm pour un contraste optimal sur le terrain.",
			Price:       145000,
			CategoryID:  catSport.ID,
			BrandID:     brandOakley.ID,
			Gender:      models.GenderMixte,
			FrameShape:  "sport",
			Material:    "plastique haute résistance",
			FrameColor:  "noir / rouge",
			StockQty:    7,
			IsAvailable: true,
			IsFeatured:  false,
		},
		{
			Name:        "Advance Vision Junior Enfant",
			Slug:        "advance-vision-junior-enfant",
			Description: "Monture robuste et flexible pour enfants. Branches en caoutchouc souple, résistante aux chocs.",
			Price:       18000,
			CategoryID:  catVue.ID,
			BrandID:     brandAV.ID,
			Gender:      models.GenderEnfant,
			FrameShape:  "rectangle",
			Material:    "plastique",
			FrameColor:  "bleu",
			StockQty:    20,
			IsAvailable: true,
			IsFeatured:  false,
		},
	}

	for i := range products {
		var existing models.Product
		result := db.Where("slug = ?", products[i].Slug).First(&existing)
		if result.Error != nil {
			// Produit inexistant — on le crée
			if err := db.Create(&products[i]).Error; err != nil {
				log.Printf("Erreur création produit %s: %v", products[i].Slug, err)
				continue
			}
			// Associer toutes les options de verres au produit
			if err := db.Model(&products[i]).Association("LensOptions").Replace(allLensOptions); err != nil {
				log.Printf("Erreur association verres pour %s: %v", products[i].Slug, err)
			}
			// Image placeholder — sera remplacée par tes vraies images
			placeholder := models.ProductImage{
				ProductID: products[i].ID,
				URL:       "/uploads/products/" + products[i].Slug + "/01.jpg",
				Position:  0,
			}
			db.Create(&placeholder)
		}
	}

	log.Println("Seed terminé — 10 produits créés")
}
