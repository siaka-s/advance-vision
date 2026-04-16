import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez Les Opticiens Mobiles, le premier service d'optique à domicile en Côte d'Ivoire.",
}

const values = [
  {
    title: "Accessibilité",
    description: "Nous croyons que chacun mérite une bonne vision, sans avoir à se déplacer. Nos opticiens viennent à vous.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: "Expertise",
    description: "Nos opticiens sont diplômés et formés aux dernières techniques d'examen visuel et de prise de mesures.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Transparence",
    description: "Prix affichés clairement, frais de déplacement calculés à l'avance, aucune surprise à la facturation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
]

export default function AProposPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">

      {/* En-tête */}
      <div className="text-center mb-14">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Notre histoire</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-soft mb-5">
          L'optique, livrée chez vous
        </h1>
        <p className="text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Les Opticiens Mobiles est le premier service d'optique à domicile en Côte d'Ivoire.
          Nous avons créé ce service pour que chaque ivoirien puisse accéder à des soins visuels de qualité,
          sans contraintes de déplacement.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-primary rounded-2xl p-8 sm:p-10 text-white mb-12">
        <h2 className="text-xl font-bold mb-3">Notre mission</h2>
        <p className="text-white/85 leading-relaxed max-w-2xl">
          Rendre l'optique accessible à tous les Ivoiriens, où qu'ils se trouvent.
          Un opticien diplômé se déplace chez vous pour réaliser votre examen de vue,
          vous aider à choisir vos lunettes et prendre toutes les mesures nécessaires
          à la fabrication de verres parfaitement adaptés.
        </p>
      </div>

      {/* Valeurs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
        {values.map((v) => (
          <div key={v.title} className="bg-surface rounded-2xl p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              {v.icon}
            </div>
            <h3 className="font-semibold text-ink-soft mb-2">{v.title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-ink-muted mb-5">Prêt à découvrir une nouvelle façon de porter des lunettes ?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/rendez-vous" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
            Prendre rendez-vous
          </Link>
          <Link href="/catalogue" className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
            Voir le catalogue
          </Link>
        </div>
      </div>
    </div>
  )
}
