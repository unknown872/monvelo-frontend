import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-black)] text-white mt-20">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Marque */}
          <div className="md:col-span-1">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4">
              MON VÉLO
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              L&apos;excellence du cyclisme depuis 2025. Des vélos d&apos;exception pour des passionnés exigeants.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-6">
              Navigation
            </h4>
            <div className="space-y-3">
              <Link href="/products" className="block text-sm text-gray-400 hover:text-white transition-colors duration-300">
                Catalogue
              </Link>
              <Link href="/cart" className="block text-sm text-gray-400 hover:text-white transition-colors duration-300">
                Panier
              </Link>
              <Link href="/orders" className="block text-sm text-gray-400 hover:text-white transition-colors duration-300">
                Mes commandes
              </Link>
            </div>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-6">
              Informations
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Livraison offerte dès 1 000 000 FCFA</p>
              <p className="text-sm text-gray-400">Retours gratuits sous 30 jours</p>
              <p className="text-sm text-gray-400">Paiement sécurisé par Wave Money</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-6">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400">contact@monvelo.com</p>
              <p className="text-sm text-gray-400">+221 77 777 77 77</p>
              <p className="text-sm text-gray-400">Dakar, Sénégal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Mon Vélo. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Réalisé par</span>
            <span className="text-[var(--color-gold)]">&#9830;</span>
            <span className="text-xs text-gray-500">Youssou TRAORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}