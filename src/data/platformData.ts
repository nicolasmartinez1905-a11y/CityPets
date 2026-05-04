import type { Location } from "./mockData";
import { cityZones } from "./mockData";

const loc = (zone: Location["zone"]) => cityZones.find((item) => item.zone === zone) ?? cityZones[0];

export type ServiceProfile = {
  id: string;
  name: string;
  category: "Veterinarios" | "Paseadores" | "Cuidadores" | "Adiestradores" | "Guarderias" | "Peluqueria" | "Transporte";
  city: string;
  zone: Location["zone"];
  location: Location;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  verified: boolean;
  trustLevel: "Alto" | "Muy alto";
};

export type ProductListing = {
  id: string;
  title: string;
  category: "Alimentos" | "Accesorios" | "Ropa" | "Caniles" | "Juguetes";
  seller: string;
  city: string;
  zone: Location["zone"];
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
};

export type Plan = {
  name: "Basico" | "Premium" | "Profesional";
  price: string;
  audience: string;
  features: string[];
  highlighted?: boolean;
};

export type AdoptionPet = {
  id: string;
  name: string;
  city: string;
  zone: Location["zone"];
  age: string;
  description: string;
  imageUrl: string;
  status: "En adopcion" | "Transito";
  vaccinated: boolean;
};

export const services: ServiceProfile[] = [
  {
    id: "vet-austral",
    name: "Vet Austral",
    category: "Veterinarios",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    description: "Consultas, vacunas, control senior y seguimiento digital para tutores de Ushuaia.",
    price: "Consulta desde $24.000",
    imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 86,
    verified: true,
    trustLevel: "Muy alto"
  },
  {
    id: "paseos-fin-del-mundo",
    name: "Paseos Fin del Mundo",
    category: "Paseadores",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    location: loc("Bahia Encerrada"),
    description: "Paseos reducidos por Bahia Encerrada y Costanera con fotos por salida.",
    price: "$8.000 por paseo",
    imageUrl: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 54,
    verified: true,
    trustLevel: "Muy alto"
  },
  {
    id: "cuidadores-andorra",
    name: "Cuidadores Andorra",
    category: "Cuidadores",
    city: "Ushuaia",
    zone: "Andorra",
    location: loc("Andorra"),
    description: "Cuidado domiciliario para perros y gatos durante viajes o jornadas largas.",
    price: "Desde $18.000 por visita",
    imageUrl: "https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 41,
    verified: true,
    trustLevel: "Alto"
  },
  {
    id: "k9-pipo",
    name: "K9 Pipo Ushuaia",
    category: "Adiestradores",
    city: "Ushuaia",
    zone: "Pipo",
    location: loc("Pipo"),
    description: "Correa, llamado, socializacion y manejo de energia para perros jovenes.",
    price: "Planes desde $52.000",
    imageUrl: "https://images.unsplash.com/photo-1601758064224-c3c3127ba632?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 39,
    verified: true,
    trustLevel: "Alto"
  },
  {
    id: "peluqueria-kuanip",
    name: "Peluqueria Kuanip Pet",
    category: "Peluqueria",
    city: "Ushuaia",
    zone: "Kuanip",
    location: loc("Kuanip"),
    description: "Bano, corte higienico y atencion tranquila para perros chicos y senior.",
    price: "Desde $20.000",
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 29,
    verified: true,
    trustLevel: "Alto"
  }
];

export const products: ProductListing[] = [
  {
    id: "alimento-frio",
    title: "Alimento premium energia alta 10kg",
    category: "Alimentos",
    seller: "Pet Shop Austral",
    city: "Ushuaia",
    zone: "Centro",
    price: "$44.900",
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 64
  },
  {
    id: "pretal-reflectivo",
    title: "Pretal reflectivo para caminatas con poca luz",
    category: "Accesorios",
    seller: "Walk Ushuaia",
    city: "Ushuaia",
    zone: "Costanera",
    price: "$19.500",
    imageUrl: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 38
  },
  {
    id: "campera-nieve",
    title: "Campera termica impermeable",
    category: "Ropa",
    seller: "Can Austral",
    city: "Ushuaia",
    zone: "Kuanip",
    price: "$32.000",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 22
  },
  {
    id: "juguete-olfato",
    title: "Juego de olfato indoor",
    category: "Juguetes",
    seller: "Mente Canina Ushuaia",
    city: "Ushuaia",
    zone: "Pipo",
    price: "$17.800",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 31
  }
];

export const plans: Plan[] = [
  {
    name: "Basico",
    price: "$0",
    audience: "Para tutores de Ushuaia que quieren participar",
    features: ["Publicaciones y stories", "Likes y comentarios", "Perfiles de mascotas", "Filtros por zona"]
  },
  {
    name: "Premium",
    price: "$3.900/mes",
    audience: "Para tutores que quieren mas visibilidad local",
    highlighted: true,
    features: ["Badge verificado", "Publicaciones destacadas", "Mayor visibilidad en Ushuaia", "Beneficios en tienda"]
  },
  {
    name: "Profesional",
    price: "$12.900/mes",
    audience: "Para servicios locales",
    features: ["Perfil profesional", "Boton contactar", "Mapa y ranking por zona", "Analiticas y leads"]
  }
];

export const adoptionPets: AdoptionPet[] = [
  {
    id: "frida",
    name: "Frida",
    city: "Ushuaia",
    zone: "Andorra",
    age: "2 anos",
    description: "Mestiza dulce, sociable con perros tranquilos y lista para familia responsable.",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    status: "En adopcion",
    vaccinated: true
  },
  {
    id: "olaf",
    name: "Olaf",
    city: "Ushuaia",
    zone: "Centro",
    age: "9 meses",
    description: "Gatito curioso, castrado, ideal para departamento con redes.",
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80",
    status: "En adopcion",
    vaccinated: true
  },
  {
    id: "coco",
    name: "Coco",
    city: "Ushuaia",
    zone: "Pipo",
    age: "5 anos",
    description: "Perro adulto tranquilo en transito, necesita paseos cortos y mucho afecto.",
    imageUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",
    status: "Transito",
    vaccinated: true
  }
];

export const trustRules = [
  "Verificacion de identidad para perfiles profesionales de Ushuaia.",
  "Documentacion obligatoria para veterinarios, paseadores, cuidadores y criadores verificados.",
  "Resenas visibles, historial de servicios y sanciones progresivas.",
  "Prohibicion de maltrato, venta irregular, fraude, negligencia o servicios sin condiciones minimas.",
  "Moderacion comunitaria con reportes y revision humana."
];
