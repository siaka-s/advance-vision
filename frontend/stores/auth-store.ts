"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Type représentant un utilisateur connecté
export interface AuthUser {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  role: "client" | "admin" | "opticien" | "livreur"
}

interface AuthState {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
  logout: () => void
  isAuthenticated: () => boolean
}

// persist : sauvegarde le store dans localStorage
// → l'utilisateur reste connecté même après avoir fermé l'onglet
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),

      isAuthenticated: () => get().user !== null,
    }),
    {
      name: "auth", // clé dans localStorage
    }
  )
)
