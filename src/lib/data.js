export const allProducts = [
  {
    slug: "velo-carbon-pro",
    name: "Vélo Carbon Pro",
    price: 1640000,
    category: "Route",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600",
    ],
    isNew: true,
    stock: 12,
    description: "Le Carbon Pro représente l'excellence du cyclisme sur route. Son cadre en carbone haute performance offre un rapport rigidité/poids exceptionnel, tandis que sa géométrie optimisée garantit un confort inégalé sur les longues distances.",
    specs: [
      { label: "Cadre", value: "Carbone T800" },
      { label: "Poids", value: "7.2 kg" },
      { label: "Groupe", value: "Shimano Ultegra Di2" },
      { label: "Roues", value: "Carbone 50mm" },
      { label: "Freins", value: "Disque hydraulique" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "vtt-enduro-x",
    name: "VTT Enduro X",
    price: 1245000,
    compareAtPrice: 1442000,
    category: "VTT",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600",
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600",
    ],
    isNew: true,
    stock: 8,
    description: "L'Enduro X est conçu pour dévaler les sentiers les plus techniques avec une confiance absolue. Sa suspension de 170mm absorbe tous les obstacles tandis que sa géométrie agressive vous permet de garder le contrôle dans toutes les situations.",
    specs: [
      { label: "Cadre", value: "Aluminium 6061" },
      { label: "Poids", value: "13.5 kg" },
      { label: "Suspension", value: "170mm / 160mm" },
      { label: "Groupe", value: "SRAM GX Eagle" },
      { label: "Freins", value: "SRAM Code RSC" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "urban-glide",
    name: "Urban Glide",
    price: 590000,
    category: "Urbain",
    images: ["https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600"],
    stock: 25,
    isNew: true,
    description: "Le Urban Glide redéfinit le vélo de ville. Léger, agile et élégant, il vous accompagne dans vos trajets quotidiens avec style. Son cadre épuré intègre des passages de câbles internes pour un look parfaitement net.",
    specs: [
      { label: "Cadre", value: "Aluminium léger" },
      { label: "Poids", value: "10.8 kg" },
      { label: "Vitesses", value: "8 vitesses Shimano" },
      { label: "Pneus", value: "700x32c anti-crevaison" },
      { label: "Freins", value: "Disque mécanique" },
      { label: "Tailles", value: "S, M, L" },
    ],
  },
  {
    slug: "gravel-explorer",
    name: "Gravel Explorer",
    price: 1049000,
    category: "Gravel",
    images: ["https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600"],
    isNew: true,
    stock: 15,
    description: "Le Gravel Explorer est votre passeport pour l'aventure. Route, chemin, gravier — aucun terrain ne lui résiste. Son cadre polyvalent accepte des pneus jusqu'à 45mm et offre de nombreux points de fixation pour le bikepacking.",
    specs: [
      { label: "Cadre", value: "Carbone / Aluminium" },
      { label: "Poids", value: "9.1 kg" },
      { label: "Groupe", value: "Shimano GRX 810" },
      { label: "Pneus", value: "700x40c" },
      { label: "Freins", value: "Disque hydraulique" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "velo-titanium-elite",
    name: "Titanium Elite",
    price: 2164000,
    category: "Route",
    images: ["https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600"],
    stock: 5,
    description: "Le Titanium Elite est l'aboutissement de notre savoir-faire. Son cadre en titane 3Al/2.5V offre une qualité de conduite incomparable : souple sur les imperfections, rigide en relance. Un vélo pour la vie.",
    specs: [
      { label: "Cadre", value: "Titane 3Al/2.5V" },
      { label: "Poids", value: "8.1 kg" },
      { label: "Groupe", value: "Shimano Dura-Ace Di2" },
      { label: "Roues", value: "Carbone 40mm" },
      { label: "Freins", value: "Disque hydraulique" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "city-comfort-plus",
    name: "City Comfort+",
    price: 492000,
    category: "Urbain",
    images: ["https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600"],
    stock: 30,
    description: "Le City Comfort+ met l'accent sur le confort au quotidien. Sa position droite, sa selle ergonomique et ses pneus larges en font le compagnon idéal pour vos trajets urbains, même les plus longs.",
    specs: [
      { label: "Cadre", value: "Aluminium step-through" },
      { label: "Poids", value: "12.5 kg" },
      { label: "Vitesses", value: "7 vitesses Shimano Nexus" },
      { label: "Pneus", value: "700x38c" },
      { label: "Freins", value: "V-brake" },
      { label: "Tailles", value: "M, L" },
    ],
  },
  {
    slug: "speedster-aero",
    name: "Speedster Aero",
    price: 1902000,
    compareAtPrice: 2295000,
    category: "Route",
    images: [
      "https://images.unsplash.com/photo-1596738901737-a39f0e5e5462?w=600",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600",
    ],
    stock: 7,
    description: "Le Speedster Aero est né pour la vitesse. Chaque tube de son cadre a été profilé en soufflerie pour réduire la traînée aérodynamique. Résultat : un vélo qui fend l'air comme aucun autre.",
    specs: [
      { label: "Cadre", value: "Carbone aéro UCI" },
      { label: "Poids", value: "7.8 kg" },
      { label: "Groupe", value: "SRAM Red eTap AXS" },
      { label: "Roues", value: "Carbone 60mm" },
      { label: "Freins", value: "Disque hydraulique" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "mountain-beast",
    name: "Mountain Beast",
    price: 1443000,
    category: "VTT",
    images: ["https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600"],
    stock: 10,
    description: "Le Mountain Beast est un monstre de capacité. Conçu pour les terrains les plus exigeants, il combine robustesse et précision pour vous emmener là où les autres s'arrêtent.",
    specs: [
      { label: "Cadre", value: "Carbone full suspension" },
      { label: "Poids", value: "12.8 kg" },
      { label: "Suspension", value: "150mm / 140mm" },
      { label: "Groupe", value: "Shimano XT" },
      { label: "Freins", value: "Shimano XT 4 pistons" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "electric-cruise",
    name: "Electric Cruise",
    price: 1312000,
    category: "Électrique",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600"],
    isNew: true,
    stock: 18,
    description: "Le Electric Cruise combine puissance électrique et design épuré. Son moteur silencieux et sa batterie intégrée vous offrent jusqu'à 120km d'autonomie pour des trajets sans effort.",
    specs: [
      { label: "Cadre", value: "Aluminium hydroformé" },
      { label: "Poids", value: "18.5 kg" },
      { label: "Moteur", value: "Shimano Steps E6100" },
      { label: "Batterie", value: "504Wh intégrée" },
      { label: "Autonomie", value: "Jusqu'à 120 km" },
      { label: "Tailles", value: "M, L, XL" },
    ],
  },
  {
    slug: "vintage-classic",
    name: "Vintage Classic",
    price: 853000,
    category: "Urbain",
    images: ["https://images.unsplash.com/photo-1505705694340-019e0d8a2e5c?w=600"],
    stock: 20,
    description: "Le Vintage Classic allie le charme rétro à la fiabilité moderne. Ses lignes intemporelles et sa finition cuivrée en font un véritable objet de désir pour les amateurs de beau.",
    specs: [
      { label: "Cadre", value: "Acier chromoly" },
      { label: "Poids", value: "11.2 kg" },
      { label: "Vitesses", value: "3 vitesses Sturmey Archer" },
      { label: "Pneus", value: "700x35c" },
      { label: "Freins", value: "Caliper classique" },
      { label: "Tailles", value: "S, M, L" },
    ],
  },
  {
    slug: "trail-master",
    name: "Trail Master",
    price: 1705000,
    compareAtPrice: 1968000,
    category: "VTT",
    images: ["https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600"],
    stock: 6,
    description: "Le Trail Master est le vélo polyvalent par excellence. Aussi à l'aise en montée qu'en descente, il s'adapte à tous les terrains et tous les styles de pilotage.",
    specs: [
      { label: "Cadre", value: "Carbone trail" },
      { label: "Poids", value: "12.0 kg" },
      { label: "Suspension", value: "140mm / 130mm" },
      { label: "Groupe", value: "SRAM GX Eagle AXS" },
      { label: "Freins", value: "SRAM G2 RSC" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
  {
    slug: "aero-speed-x",
    name: "Aero Speed X",
    price: 2558000,
    category: "Route",
    images: ["https://images.unsplash.com/photo-1596738901737-a39f0e5e5462?w=600"],
    stock: 3,
    description: "L'Aero Speed X est notre machine de course ultime. Développé avec des coureurs professionnels, il repousse les limites de l'aérodynamisme et de la légèreté.",
    specs: [
      { label: "Cadre", value: "Carbone UHM aéro" },
      { label: "Poids", value: "6.9 kg" },
      { label: "Groupe", value: "Shimano Dura-Ace Di2" },
      { label: "Roues", value: "Carbone 65mm" },
      { label: "Freins", value: "Disque hydraulique" },
      { label: "Tailles", value: "S, M, L, XL" },
    ],
  },
];

export const categoriesList = ["Tous", "Route", "VTT", "Urbain", "Gravel", "Électrique"];

export const categoriesShowcase = [
  {
    name: "Route",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800",
    count: 45,
  },
  {
    name: "VTT",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
    count: 38,
  },
  {
    name: "Urbain",
    image: "https://images.unsplash.com/photo-1505705694340-019e0d8a2e5c?w=800",
    count: 27,
  },
];

export const sortOptions = [
  { value: "newest", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name", label: "Nom A-Z" },
];

// Helper pour formater les prix en FCFA
export function formatPrice(price) {
  return price.toLocaleString("fr-FR") + " FCFA";
}

export function getNewArrivals() {
  return allProducts.filter((p) => p.isNew).slice(0, 4);
}

export function getBestSellers() {
  return allProducts.filter((p) => !p.isNew).slice(0, 4);
}

export function getProductBySlug(slug) {
  return allProducts.find((p) => p.slug === slug);
}