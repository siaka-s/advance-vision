"use client"

import { useState } from "react"

type AppointmentType = "examen_vue" | "conseil" | "essayage" | "autre"

const appointmentTypes: { value: AppointmentType; label: string; description: string }[] = [
  { value: "examen_vue",  label: "Examen de vue",        description: "Bilan visuel complet avec un opticien" },
  { value: "conseil",     label: "Conseil montures",     description: "Aide au choix de lunettes" },
  { value: "essayage",    label: "Essayage",             description: "Essayez nos lunettes en boutique" },
  { value: "autre",       label: "Autre demande",        description: "Toute autre question ou service" },
]

const timeSlots = [
  "08h00", "08h30", "09h00", "09h30", "10h00", "10h30",
  "11h00", "11h30", "14h00", "14h30", "15h00", "15h30",
  "16h00", "16h30", "17h00", "17h30",
]

type FormState = "idle" | "loading" | "success" | "error"

export default function AppointmentForm() {
  const [type, setType]     = useState<AppointmentType>("examen_vue")
  const [state, setState]   = useState<FormState>("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState("loading")
    // Simulation d'envoi (MVP — pas encore connecté au backend)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setState("success")
  }

  if (state === "success") {
    return (
      <div className="bg-success/10 border border-success/30 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-ink-soft mb-2">Demande envoyée !</h2>
        <p className="text-ink-muted text-sm mb-6">
          Nous vous confirmerons votre rendez-vous par SMS ou appel dans les plus brefs délais.
        </p>
        <button
          onClick={() => setState("idle")}
          className="text-sm text-primary hover:underline"
        >
          Faire une autre demande
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white-pure border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6"
    >
      <h2 className="font-semibold text-ink-soft text-lg">Votre demande</h2>

      {/* Type de rendez-vous */}
      <div>
        <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
          Type de rendez-vous
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {appointmentTypes.map((apt) => (
            <label
              key={apt.value}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                type === apt.value
                  ? "border-primary bg-primary/5"
                  : "border-surface-border hover:border-primary/30"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={apt.value}
                checked={type === apt.value}
                onChange={() => setType(apt.value)}
                className="mt-0.5 accent-primary"
              />
              <div>
                <p className="text-sm font-medium text-ink-soft">{apt.label}</p>
                <p className="text-xs text-ink-muted">{apt.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Prénom + Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-ink-soft mb-1.5">
            Prénom <span className="text-error">*</span>
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            placeholder="ex : Kouadio"
            className="w-full border border-surface-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-ink-soft mb-1.5">
            Nom <span className="text-error">*</span>
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            placeholder="ex : Yao"
            className="w-full border border-surface-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink-soft mb-1.5">
          Numéro de téléphone <span className="text-error">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+225 07 00 00 00 00"
          className="w-full border border-surface-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
      </div>

      {/* Date + Créneau */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-ink-soft mb-1.5">
            Date souhaitée <span className="text-error">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full border border-surface-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-ink-soft mb-1.5">
            Créneau horaire <span className="text-error">*</span>
          </label>
          <select
            id="time"
            name="time"
            required
            className="w-full border border-surface-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white-pure"
          >
            <option value="">Choisir un créneau</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message optionnel */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-soft mb-1.5">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Précisez votre demande, indiquez si vous portez déjà des lunettes…"
          className="w-full border border-surface-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {state === "loading" ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours…
          </>
        ) : (
          "Demander un rendez-vous"
        )}
      </button>

      <p className="text-xs text-ink-muted text-center">
        Nous vous rappellerons pour confirmer votre créneau.
      </p>
    </form>
  )
}
