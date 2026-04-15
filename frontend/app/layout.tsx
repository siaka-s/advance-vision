import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: {
    default: "Les Opticiens Mobiles — Votre opticien à domicile",
    template: "%s | Les Opticiens Mobiles",
  },
  description:
    "Les Opticiens Mobiles, votre opticien à domicile en Côte d'Ivoire. Test de vue, essayage et livraison chez vous. Lunettes de vue, solaires, sport et luxe.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
