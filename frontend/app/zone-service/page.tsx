import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Zone de service",
  description: "Découvrez les zones couvertes par Les Opticiens Mobiles en Côte d'Ivoire.",
}

const zones = [
  { name: "Plateau", description: "Centre des affaires d'Abidjan", tarif: "2 000 FCFA", disponible: true },
  { name: "Cocody",  description: "Cocody, Riviera, Angré",       tarif: "2 500 FCFA", disponible: true },
  { name: "Yopougon", description: "Yopougon et environs",        tarif: "3 000 FCFA", disponible: true },
  { name: "Marcory / Treichville", description: "Marcory, Treichville, Port-Bouët", tarif: "2 500 FCFA", disponible: true },
  { name: "Adjamé / Abobo", description: "Adjamé, Abobo, Anyama", tarif: "3 500 FCFA", disponible: true },
  { name: "Bingerville", description: "Bingerville et communes est", tarif: "4 000 FCFA", disponible: true },
  { name: "Grand Bassam", description: "Grand Bassam et alentours", tarif: "5 000 FCFA", disponible: false },
  { name: "Bouaké", description: "Déplacement sur demande",        tarif: "Sur devis",  disponible: false },
]

export default function ZoneServicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">

      <div className="text-center mb-12">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Couverture</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-soft mb-4">Notre zone de service</h1>
        <p className="text-ink-muted max-w-xl mx-auto">
          Nous intervenons dans toute la zone d'Abidjan et ses environs.
          Le tarif de déplacement est calculé selon votre commune.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {zones.map((zone) => (
          <div
            key={zone.name}
            className={`flex items-center justify-between p-5 rounded-xl border ${
              zone.disponible
                ? "bg-white-pure border-surface-border"
                : "bg-surface border-surface-border opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${zone.disponible ? "bg-success" : "bg-ink-muted"}`} />
              <div>
                <p className="font-semibold text-ink-soft text-sm">{zone.name}</p>
                <p className="text-xs text-ink-muted mt-0.5">{zone.description}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <p className="text-sm font-bold text-primary">{zone.tarif}</p>
              <p className="text-xs text-ink-muted">{zone.disponible ? "Disponible" : "Bientôt"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
        <p className="text-ink-soft text-sm mb-4">
          Votre commune n'est pas listée ? Contactez-nous, nous étudions chaque demande.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/rendez-vous" className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors">
            Demander un déplacement
          </Link>
          <Link href="/contact" className="border border-primary text-primary px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  )
}
