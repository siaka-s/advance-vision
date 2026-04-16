import Link from "next/link"

const links = [
  {
    title: "Catalogue",
    items: [
      { label: "Lunettes de vue", href: "/catalogue?category_id=1" },
      { label: "Lunettes solaires", href: "/catalogue?category_id=2" },
      { label: "Lunettes de sport", href: "/catalogue?category_id=3" },
      { label: "Lunettes de luxe", href: "/catalogue?category_id=4" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Prise de rendez-vous", href: "/rendez-vous" },
      { label: "Mon compte", href: "/client" },
      { label: "Suivi de commande", href: "/client/commandes" },
    ],
  },
  {
    title: "Informations",
    items: [
      { label: "À propos", href: "/a-propos" },
      { label: "Zone de service", href: "/zone-service" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink-soft text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Marque */}
          <div className="md:col-span-1">
            <span className="text-white font-bold text-lg">Les Opticiens Mobiles</span>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Votre opticien à domicile en Côte d'Ivoire. Test de vue, essayage et livraison chez vous.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Abidjan, Côte d'Ivoire
            </p>
          </div>

          {/* Liens */}
          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bas de footer */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Les Opticiens Mobiles. Tous droits réservés.
          </p>
          <p className="text-xs text-white/40">
            Paiements : Orange Money · MTN · Moov · Visa · Mastercard
          </p>
        </div>
      </div>
    </footer>
  )
}
