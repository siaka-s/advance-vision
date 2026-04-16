import type { AuthUser } from "@/stores/auth-store"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Types des données envoyées au backend
export interface RegisterInput {
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

// Type de la réponse du backend après connexion/inscription
interface AuthResponse {
  success: boolean
  message?: string
  error?: string
  data?: AuthUser
}

// Inscription — crée un compte et connecte automatiquement
export async function register(input: RegisterInput): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important : permet de recevoir les cookies httpOnly
    body: JSON.stringify(input),
  })

  const json: AuthResponse = await response.json()

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Erreur lors de l'inscription")
  }

  return json.data
}

// Connexion — vérifie email + mot de passe
export async function login(input: LoginInput): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  })

  const json: AuthResponse = await response.json()

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? "Email ou mot de passe incorrect")
  }

  return json.data
}

// Déconnexion — efface les cookies côté backend
export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
}

// Récupère le profil de l'utilisateur connecté (via le cookie)
export async function getMe(): Promise<AuthUser | null> {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      credentials: "include",
    })

    if (!response.ok) return null

    const json: AuthResponse = await response.json()
    return json.data ?? null
  } catch {
    return null
  }
}
