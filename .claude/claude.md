# CLAUDE.md — Advance Vision E-commerce Project

> Ce fichier est la source de vérité pour Claude dans ce projet.
> Il doit être placé dans `.claude/CLAUDE.md`.
> Chaque session commence par la lecture de ce fichier.

---

## 1. VUE D'ENSEMBLE DU PROJET

**Advance Vision** est une plateforme e-commerce web pour une maison d'optique ivoirienne.
Elle couvre la vente en ligne de lunettes (vue, solaires, sport, luxe), la gestion des ordonnances,
la prise de rendez-vous et un backoffice d'administration complet.

**Marché cible :** Côte d'Ivoire et Afrique francophone (16–65 ans).
**Langues :** Français uniquement.
**Devise :** FCFA.

---

## 2. CHARTE GRAPHIQUE & DESIGN SYSTEM

### Palette de couleurs

```css
:root {
  /* Couleur principale — Bleu marine Advance Vision */
  --color-primary:        #001F91;                 /* bleu marine profond */
  --color-primary-light:  rgba(0, 31, 145, 0.10);  /* fonds subtils, badges */
  --color-primary-hover:  #001570;                 /* hover boutons */
  --color-primary-dark:   #000F52;                 /* accents forts, focus */

  /* Blanc principal */
  --color-white:          #FFFFFC;                 /* blanc légèrement chaud */
  --color-white-pure:     #FFFFFF;

  /* Noirs & nuances sombres */
  --color-black:          #0D0D0D;                 /* texte principal */
  --color-black-soft:     #1A1A1A;                 /* titres, headings */
  --color-gray-dark:      #2E2E2E;                 /* texte secondaire */
  --color-gray-mid:       #5C5C5C;                 /* labels, placeholders */
  --color-gray-light:     #E8E8E8;                 /* bordures, séparateurs */
  --color-gray-subtle:    #F5F5F3;                 /* fonds de sections */

  /* États fonctionnels */
  --color-success:        #2A9D6E;
  --color-warning:        #E9A84C;
  --color-error:          #D94F4F;
}
```

### Utilisation des couleurs par contexte

| Élément                        | Couleur                          |
|--------------------------------|----------------------------------|
| Bouton CTA principal           | `#001F91` fond + texte blanc     |
| Bouton CTA hover               | `#001570`                        |
| Fond page / app                | `#FFFFFC`                        |
| Fond sections alternées        | `#F5F5F3`                        |
| Texte courant                  | `#0D0D0D`                        |
| Titres H1/H2                   | `#1A1A1A`                        |
| Texte secondaire               | `#5C5C5C`                        |
| Liens                          | `#001F91`                        |
| Bordures / dividers            | `#E8E8E8`                        |
| Badges / tags produit          | `rgba(0,31,145,0.10)` + texte `#001F91` |
| Sidebar admin                  | `#001F91` fond + texte blanc     |
| Header site public             | `#FFFFFC` + bordure basse        |
| Footer                         | `#1A1A1A` fond + texte clair     |

### Configuration Tailwind CSS

```ts
// frontend/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#001F91',
          light:   'rgba(0, 31, 145, 0.10)',
          hover:   '#001570',
          dark:    '#000F52',
        },
        white: {
          DEFAULT: '#FFFFFC',
          pure:    '#FFFFFF',
        },
        ink: {
          DEFAULT: '#0D0D0D',
          soft:    '#1A1A1A',
          muted:   '#5C5C5C',
        },
        surface: {
          DEFAULT: '#F5F5F3',
          border:  '#E8E8E8',
        },
      },
      fontFamily: {
        sans:    ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### Règles design pour Claude

1. **Jamais de couleurs codées en dur** dans les composants — toujours les tokens Tailwind
2. **Fond principal** toujours `#FFFFFC`, jamais `#FFFFFF` pur sauf exception
3. **Boutons primaires** : `bg-primary` + texte blanc + hover `bg-primary-hover` + transition
4. **Boutons secondaires** : `border border-primary text-primary` + fond transparent
5. **Texte principal** : `text-ink`, jamais `text-black` Tailwind
6. **Le bleu `#001F91` ne s'utilise PAS en fond de grande surface** — réservé boutons, liens, sidebar admin, badges
7. **Focus / outline** : `ring-primary` pour l'accessibilité
8. **Sidebar admin** : fond `#001F91`, texte et icônes blancs — contraste fort voulu
9. **Ombres** : légères et subtiles, jamais lourdes
10. **Site public vs backoffice** : distinction visuelle claire — public sur fond clair, admin sur sidebar marine

---

## 3. STACK TECHNIQUE

### Backend
- **Langage :** Go (Golang) — dernière version stable
- **Framework HTTP :** [Fiber](https://gofiber.io/) v2
- **ORM :** [GORM](https://gorm.io/) avec PostgreSQL
- **Base de données :** PostgreSQL
- **Auth :** JWT (access + refresh tokens) + bcrypt
- **Upload fichiers :** Stockage local (dev) → Cloudinary (prod)
- **Email :** Resend API
- **Validation :** [go-playground/validator](https://github.com/go-playground/validator)
- **Docs API :** Swagger via [swaggo/swag](https://github.com/swaggo/swag)
- **Containerisation :** Docker + docker-compose

### Frontend
- **Framework :** Next.js 14+ (App Router)
- **Langage :** TypeScript (strict mode)
- **Styles :** Tailwind CSS + shadcn/ui
- **State management :** Zustand + TanStack Query
- **Formulaires :** React Hook Form + Zod
- **Paiements :** CinetPay (Orange Money, MTN, Moov, CB)

### Infrastructure
- **Dev local :** Docker Compose
- **Déploiement frontend :** Vercel
- **Déploiement backend :** Railway / Render / VPS
- **Base de données prod :** Railway Postgres ou Supabase

---

## 4. STRUCTURE DU PROJET

```
advance-vision/
├── .claude/
│   ├── CLAUDE.md              ← CE FICHIER
│   ├── settings.json
│   └── docs/
│       └── cahier_des_charges.pdf
├── docker-compose.yml
├── .env.example
│
├── backend/
│   ├── cmd/server/main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── database/
│   │   ├── models/
│   │   ├── handlers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── migrations/
│   ├── Dockerfile
│   ├── go.mod
│   └── go.sum
│
└── frontend/
    ├── app/
    │   ├── (public)/
    │   ├── (auth)/
    │   ├── (client)/
    │   └── (admin)/
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │   ├── catalog/
    │   ├── product/
    │   ├── cart/
    │   ├── account/
    │   └── admin/
    ├── lib/
    │   ├── api.ts
    │   ├── auth.ts
    │   └── utils.ts
    ├── hooks/
    ├── stores/
    ├── types/
    ├── Dockerfile
    ├── tailwind.config.ts
    └── package.json
```

---

## 5. ROADMAP — MVP FIRST

> **Philosophie :** Chaque phase livre des fonctionnalités utilisables en production.
> On ne passe à la phase suivante que quand la précédente est validée et stable.
> Claude doit expliquer ses choix à chaque étape et attendre validation avant de coder.

---

### MVP 1 — Fondations & Catalogue (Priorité absolue)
> **Objectif :** Un site accessible, avec des produits affichables et filtrables.
> À ce stade : pas de compte, pas de panier. Juste voir les produits.

**Backend :**
- [ ] Setup Go + Fiber + GORM + PostgreSQL + Docker
- [ ] Modèles : `Product`, `Category`, `Brand`, `LensOption`
- [ ] `GET /api/v1/health`
- [ ] `GET /api/v1/products` — liste + filtres + pagination
- [ ] `GET /api/v1/products/:slug` — détail produit
- [ ] `GET /api/v1/categories`
- [ ] `GET /api/v1/brands`
- [ ] Seed de données de test (10 produits minimum)

**Frontend :**
- [ ] Setup Next.js 14 + TypeScript + Tailwind + tokens couleurs
- [ ] Layout global (Header + Footer) aux couleurs Advance Vision
- [ ] Page d'accueil (hero + quelques produits mis en avant)
- [ ] Page catalogue `/catalogue` avec filtres et grille produits
- [ ] Page fiche produit `/produit/[slug]`
- [ ] Client API `lib/api.ts` connecté au backend

**Critère de validation :** On peut naviguer, filtrer et voir les produits sur le vrai backend.

---

### MVP 2 — Authentification & Espace Client de base
> **Objectif :** Un utilisateur peut créer un compte, se connecter et voir son profil.

**Backend :**
- [ ] Modèle `User` (email, password_hash, role, nom, prénom, téléphone)
- [ ] `POST /api/v1/auth/register`
- [ ] `POST /api/v1/auth/login` → JWT access + refresh token
- [ ] `POST /api/v1/auth/refresh`
- [ ] `POST /api/v1/auth/logout`
- [ ] Middleware `RequireAuth` et `RequireRole`
- [ ] `GET /api/v1/users/me`
- [ ] `PUT /api/v1/users/me`

**Frontend :**
- [ ] Pages `/connexion` et `/inscription`
- [ ] Store Zustand auth (user, token)
- [ ] JWT stocké en cookie httpOnly
- [ ] Protection routes `/client/*`
- [ ] Dashboard client minimal (nom, email, bouton déconnexion)

**Critère de validation :** Inscription → connexion → accès espace client → déconnexion.

---

### MVP 3 — Panier & Commande simple
> **Objectif :** Un client peut ajouter un produit au panier et passer une commande.
> Paiement simulé à cette étape (pas encore Mobile Money réel).

**Backend :**
- [ ] Modèles `Cart`, `CartItem`, `Order`, `OrderItem`
- [ ] `POST /api/v1/cart/items`
- [ ] `GET /api/v1/cart`
- [ ] `PUT /api/v1/cart/items/:id`
- [ ] `DELETE /api/v1/cart/items/:id`
- [ ] `POST /api/v1/orders` — créer commande (statut `en_attente`)
- [ ] `GET /api/v1/orders` — historique client
- [ ] `GET /api/v1/orders/:id`
- [ ] Email de confirmation commande (Resend)

**Frontend :**
- [ ] Composant panier (slide-over)
- [ ] Tunnel commande 3 étapes : panier → livraison → confirmation
- [ ] Page confirmation de commande
- [ ] Historique commandes dans l'espace client

**Critère de validation :** Ajouter au panier → remplir adresse → confirmer → recevoir email.

---

### MVP 4 — Backoffice Admin de base
> **Objectif :** L'équipe Advance Vision peut gérer produits et commandes sans toucher à la base de données.

**Backend :**
- [ ] Routes admin protégées par rôle `gestionnaire` et `super_admin`
- [ ] CRUD produits avec upload photo (stockage local)
- [ ] CRUD catégories et marques
- [ ] `GET /api/v1/admin/orders` — toutes les commandes
- [ ] `PUT /api/v1/admin/orders/:id/status` — changer statut
- [ ] `GET /api/v1/admin/customers` — liste clients

**Frontend :**
- [ ] Layout admin distinct (sidebar bleu marine `#001F91`)
- [ ] Dashboard KPIs (nb commandes, revenus du jour)
- [ ] CRUD produits avec upload image
- [ ] Table commandes avec filtres et changement de statut
- [ ] Liste clients

**Critère de validation :** Un admin peut ajouter un produit et traiter une commande de bout en bout.

---

### MVP 5 — Ordonnances & Personnalisation verres
> **Objectif :** Permettre la commande de lunettes de vue avec ordonnance.

**Backend :**
- [ ] Modèle `Prescription` (upload PDF/image, données optiques)
- [ ] `POST /api/v1/prescriptions` — upload
- [ ] `GET /api/v1/prescriptions` — liste client
- [ ] `DELETE /api/v1/prescriptions/:id`
- [ ] Lier ordonnance à un `CartItem`

**Frontend :**
- [ ] Module sélection verres sur la fiche produit
- [ ] Upload ordonnance dans le tunnel commande
- [ ] Bibliothèque ordonnances dans l'espace client

**Critère de validation :** Commander des lunettes de vue avec sélection des verres et upload d'ordonnance.

---

### MVP 6 — Paiements réels (CinetPay)
> **Objectif :** Intégrer les paiements Mobile Money et CB pour la Côte d'Ivoire.

- [ ] Intégration CinetPay (Orange Money, MTN, Moov, CB)
- [ ] Webhook confirmation paiement côté backend
- [ ] Mise à jour automatique statut commande après paiement
- [ ] Gestion paiements en attente / échecs
- [ ] Interface admin : validation paiements

**Critère de validation :** Paiement Orange Money réel sur commande test.

---

### PHASE 2 — Fonctionnalités avancées (après MVP stable)

- **Prise de rendez-vous** : calendrier, confirmation SMS (Africa's Talking)
- **Wishlist** : liste de souhaits client
- **Codes promotionnels** : gestion admin + saisie tunnel commande
- **Essai virtuel** : module webcam / photo (API tierce)
- **Recommandations** : par forme de visage et ordonnance

---

## 6. CONVENTIONS DE CODE

### Go (Backend)

```go
// Architecture stricte : Handler → Service → Repository
// Format de réponse API standard
type APIResponse struct {
    Success bool        `json:"success"`
    Message string      `json:"message,omitempty"`
    Data    interface{} `json:"data,omitempty"`
    Error   string      `json:"error,omitempty"`
}
```

- Toujours valider les inputs avec `go-playground/validator`
- Ne jamais exposer les erreurs internes au client
- Logs structurés (pas de `fmt.Println` en prod)

### TypeScript / Next.js (Frontend)

- **Toujours typer** props, réponses API, formulaires
- Server Components par défaut, `"use client"` uniquement si nécessaire
- Appels API toujours via `lib/api.ts`
- Composants : `PascalCase` — fichiers : `kebab-case`
- Formulaires : React Hook Form + Zod systématiquement

### API REST

- Versioning : `/api/v1/...`
- Ressources en minuscules pluriel : `/products`, `/orders`
- Codes HTTP respectés : 200, 201, 400, 401, 403, 404, 422, 500
- Pagination : `?page=1&limit=20` → `{ total, page, pages, data[] }`

---

## 7. INSTRUCTIONS POUR CLAUDE

### Comportement obligatoire à chaque étape

1. **Expliquer le choix avant de coder** : pourquoi cette approche, quelles alternatives ont été écartées et pourquoi.
2. **Attendre validation** : après chaque explication de choix technique, attendre un "go" ou une correction avant de produire le code.
3. **Un fichier à la fois** : créer UN SEUL fichier ou dossier à la fois, expliquer son rôle, attendre confirmation avant de passer au suivant.
4. **Signaler les dépendances** : mentionner explicitement les fichiers qui doivent exister avant d'utiliser le code proposé.
5. **Commandes à exécuter** : pour chaque action (création de fichier, installation, démarrage), donner la commande exacte à copier-coller dans le terminal.
6. **Expliquer chaque dossier et fichier** : avant de créer quoi que ce soit, expliquer en français simple à quoi ça sert, pourquoi c'est là, et comment ça s'articule avec le reste.

### Profil utilisateur — règles de communication

- L'utilisateur n'est pas développeur expérimenté : **tout expliquer en français simple**, sans jargon non expliqué.
- Chaque concept technique nouveau (middleware, ORM, repository...) doit être expliqué en une phrase claire avant d'être utilisé.
- Ne jamais créer plusieurs fichiers d'un coup — **un fichier = une validation**.
- Toujours donner la commande shell exacte à taper, pas juste le concept.
- Si une commande peut avoir des effets importants (suppression, migration...), **prévenir avant**.

### Format pour introduire un nouveau fichier

```
## Fichier : [chemin/du/fichier.go]
**Ce que c'est :** ... (explication en une phrase simple)
**Pourquoi on en a besoin :** ...
**Ce qu'il contient :** ...
**Commande pour le créer :** (si nécessaire, ex: mkdir)
→ Je crée ce fichier ?
```

### Format de présentation d'un choix technique

```
## Choix technique : [nom]
**Ce que je propose :** ...
**Pourquoi :** ...
**Alternative écartée :** ... parce que ...
**Impact sur l'architecture :** ...
→ Tu valides ce choix ?
```

### Pour le backend Go
- Toujours respecter Handler → Service → Repository
- Toujours montrer le modèle avant le handler
- Proposer la migration SQL avec chaque nouveau modèle
- Annoter les handlers avec les commentaires Swagger

### Pour le frontend Next.js
- Indiquer Server ou Client Component pour chaque composant
- Toujours inclure les types TypeScript
- Connecter systématiquement au vrai endpoint (pas de mock)
- Appliquer les tokens couleurs définis en section 2

### Ce que Claude NE doit PAS faire
- Créer plusieurs fichiers d'un coup sans validation intermédiaire
- Coder sans avoir expliqué et fait valider l'approche
- Inventer des librairies inexistantes
- Utiliser `any` en TypeScript sans justification
- Mélanger logique métier dans les handlers Go
- Sauter une étape de la roadmap MVP sans validation
- Utiliser du jargon technique sans l'expliquer en français simple

### Quand je dis "implémente X"
Cela signifie fournir dans l'ordre, avec validation à chaque étape :
1. Explication du choix technique + attente de validation
2. Structure des dossiers à créer (un par un, avec explication)
3. Fichiers backend (modèle → repository → service → handler → route), un à la fois
4. Fichiers frontend (types → appel API → composant → hook), un à la fois
5. Commandes à exécuter à chaque étape
6. Comment tester que ça fonctionne

---

## 8. CONTEXTE MÉTIER IMPORTANT

- Prix toujours en **FCFA** (entier, pas de décimales)
- Une commande peut contenir des montures avec ou sans verres
- Une monture avec verres → ordonnance obligatoire
- Le workflow lunettes de vue inclut un **rendez-vous obligatoire** avant finalisation
- Rôles : `super_admin`, `gestionnaire`, `opticien`, `client`
- L'admin peut modifier la monture d'une commande tant que le RDV n'est pas finalisé
- Paiements : Orange Money, MTN Money, Moov Money, CB (Visa/MC), Espèces à la livraison

---

## 9. VARIABLES D'ENVIRONNEMENT

### Backend (`backend/.env`)
```env
PORT=8080
ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=advance_vision

JWT_SECRET=
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

RESEND_API_KEY=

CINETPAY_API_KEY=
CINETPAY_SITE_ID=
CINETPAY_SECRET_KEY=

CLOUDINARY_URL=
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=
NEXT_PUBLIC_CINETPAY_KEY=
```

---

## 10. DÉCISIONS TECHNIQUES VALIDÉES

### Docker Compose — Stratégie dev/prod (validé)
- **Dev :** Docker Compose gère uniquement **PostgreSQL + Adminer**. Go lancé avec `air`, Next.js avec `npm run dev` directement en local.
- **Prod :** `docker-compose.prod.yml` — tout dans Docker (PostgreSQL + Backend + Frontend).
- Raison : hot reload natif, debug facile, friction minimale en développement actif.

### Modèle `Product` — Enrichi dès le départ (validé)
- Inclure dès MVP 1 : `gender` (homme/femme/enfant/mixte), `frame_shape`, `material`, `frame_color`
- Ne pas attendre MVP 5 pour enrichir le modèle

### `LensOption` — Relation avec `Product` (validé)
- `LensOption` est une table de référence indépendante liée à **tous les produits**
- Relation many-to-many entre `Product` et `LensOption`

### Images produits — Workflow (validé)
- L'utilisateur fournit les images ; Claude indique où les placer dans le projet
- Upload admin géré lors de la phase d'authentification (MVP 2 étendu)
- Seed de données MVP 1 : référence des fichiers images locaux

---

## 11. COMMANDES UTILES

```bash
# Démarrer l'environnement complet
docker-compose up -d

# Backend Go avec hot reload
cd backend && air

# Frontend Next.js
cd frontend && npm run dev

# Générer la doc Swagger
cd backend && swag init -g cmd/server/main.go

# Build production
docker-compose -f docker-compose.prod.yml up --build
```

---

*Mettre à jour ce fichier à chaque évolution majeure de l'architecture ou des choix techniques.*