import React from 'react'
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1600')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <span className="inline-block text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] mb-6">
            Collection 2025
          </span>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] max-w-3xl">
            L&apos;art du
            <br />
            cyclisme
          </h1>
          <p className="mt-6 text-gray-300 max-w-md text-lg leading-relaxed">
            Des vélos d&apos;exception, conçus pour ceux qui ne font aucun compromis sur la performance et l&apos;élégance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-[var(--color-black)] text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] hover:text-white transition-colors duration-300"
            >
              Découvrir
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 border border-white/40 text-white text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-[var(--color-black)] transition-colors duration-300"
            >
              Catalogue
            </Link>
          </div>
        </div>
      </section>
  )
}
