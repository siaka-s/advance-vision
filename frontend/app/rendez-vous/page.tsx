import type { Metadata } from "next"
import AppointmentForm from "@/components/appointment/AppointmentForm"

export const metadata: Metadata = {
  title: "Rendez-vous",
  description: "Prenez rendez-vous pour un examen de vue ou un conseil personnalisé avec nos opticiens.",
}

const advantages = [
  {
    title: "Examen de vue complet",
    description: "Nos opticiens réalisent un bilan visuel précis adapté à votre correction.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Conseils personnalisés",
    description: "Choisissez vos montures avec l'aide d'un expert selon votre visage et votre style.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Durée : 30–45 minutes",
    description: "Prenez le temps qu'il faut. Nous ne sommes pas pressés — votre vision mérite attention.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function RendezVousPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
          À votre service
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-soft mb-4">
          Prendre rendez-vous
        </h1>
        <p className="text-ink-muted max-w-xl mx-auto">
          Examen de vue, conseil montures ou essayage — nos opticiens sont disponibles pour vous
          accompagner dans votre choix.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Formulaire — côté gauche */}
        <div className="lg:col-span-3">
          <AppointmentForm />
        </div>

        {/* Informations — côté droit */}
        <div className="lg:col-span-2 space-y-6">
          {/* Avantages */}
          <div className="bg-surface rounded-2xl p-6">
            <h2 className="font-semibold text-ink-soft mb-5">Pourquoi prendre RDV ?</h2>
            <div className="space-y-5">
              {advantages.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-ink-soft text-sm">{item.title}</p>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horaires */}
          <div className="bg-white-pure border border-surface-border rounded-2xl p-6">
            <h2 className="font-semibold text-ink-soft mb-4">Nos horaires</h2>
            <dl className="space-y-2 text-sm">
              {[
                { day: "Lundi – Vendredi", hours: "08h00 – 18h00" },
                { day: "Samedi",           hours: "09h00 – 17h00" },
                { day: "Dimanche",         hours: "Fermé" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between items-center">
                  <dt className="text-ink-muted">{day}</dt>
                  <dd className={`font-medium ${hours === "Fermé" ? "text-error" : "text-ink-soft"}`}>
                    {hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact direct */}
          <div className="bg-primary rounded-2xl p-6 text-white">
            <h2 className="font-semibold mb-2">Besoin d'aide ?</h2>
            <p className="text-sm text-white/80 mb-4">
              Vous préférez appeler directement ? Notre équipe est disponible.
            </p>
            <a
              href="tel:+22501000000"
              className="flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +225 01 00 00 00 00
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
