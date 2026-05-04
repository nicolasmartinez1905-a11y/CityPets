export type Location = {
  city: string;
  zone: "Centro" | "Andorra" | "Pipo" | "Costanera" | "Bahia Encerrada" | "Parque Nacional" | "Kuanip";
  lat: number;
  lng: number;
};

export type Pet = {
  id: string;
  name: string;
  type: "Perro" | "Gato" | "Otro";
  breed: string;
  age: number;
  sex: "Macho" | "Hembra";
  city: string;
  zone: Location["zone"];
  location: Location;
  description: string;
  mainPhotoUrl: string;
  gallery: string[];
  isNeutered: boolean;
  hasChip: boolean;
  vaccinesOk: boolean;
  temperament: string[];
  owner: {
    name: string;
    avatarUrl: string;
    bio: string;
    rating: number;
  };
  matchScore: number;
};

export type Comment = {
  id: string;
  author: string;
  text: string;
};

export type Post = {
  id: string;
  petId: string;
  petName: string;
  ownerName: string;
  city: string;
  zone: Location["zone"];
  location: Location;
  text: string;
  photoUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  commentsList: Comment[];
};

export type MarketplaceItem = {
  id: string;
  title: string;
  category: "Veterinaria" | "Paseador" | "Instructor K9" | "Producto" | "Guarderia";
  city: string;
  zone: Location["zone"];
  description: string;
  imageUrl: string;
  priceLabel: string;
  rating: number;
  reviewCount: number;
};

export type Review = {
  id: string;
  targetName: string;
  authorName: string;
  rating: number;
  text: string;
};

export const defaultCity = "Ushuaia";

export const cityZones: Location[] = [
  { city: "Ushuaia", zone: "Centro", lat: -54.8069, lng: -68.3073 },
  { city: "Ushuaia", zone: "Andorra", lat: -54.7897, lng: -68.2864 },
  { city: "Ushuaia", zone: "Pipo", lat: -54.8293, lng: -68.3624 },
  { city: "Ushuaia", zone: "Costanera", lat: -54.8131, lng: -68.3051 },
  { city: "Ushuaia", zone: "Bahia Encerrada", lat: -54.8112, lng: -68.3262 },
  { city: "Ushuaia", zone: "Parque Nacional", lat: -54.8391, lng: -68.4877 },
  { city: "Ushuaia", zone: "Kuanip", lat: -54.8017, lng: -68.3332 }
];

const loc = (zone: Location["zone"]) => cityZones.find((item) => item.zone === zone) ?? cityZones[0];

export const pets: Pet[] = [
  {
    id: "luna",
    name: "Luna",
    type: "Perro",
    breed: "Border Collie",
    age: 3,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    location: loc("Bahia Encerrada"),
    description: "Activa, sociable y feliz cuando corre cerca de la bahia.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80"
    ],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["sociable", "activo", "obediente"],
    owner: {
      name: "Sofia Alvarez",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      bio: "Vivo cerca de Bahia Encerrada y busco planes pet friendly en Ushuaia.",
      rating: 4.9
    },
    matchScore: 96
  },
  {
    id: "toto",
    name: "Toto",
    type: "Perro",
    breed: "Mestizo",
    age: 2,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Andorra",
    location: loc("Andorra"),
    description: "Jugueton, muy companero y acostumbrado a caminatas largas.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: false,
    vaccinesOk: true,
    temperament: ["jugueton", "companero"],
    owner: {
      name: "Nicolas Mansilla",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Paseos por Andorra y salidas al monte los fines de semana.",
      rating: 4.7
    },
    matchScore: 89
  },
  {
    id: "nina",
    name: "Nina",
    type: "Gato",
    breed: "Europeo comun",
    age: 4,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    description: "Tranquila, curiosa y experta en mirar nieve desde la ventana.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["tranquilo", "curioso"],
    owner: {
      name: "Camila Torres",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      bio: "Centro de Ushuaia. Recomiendo veterinarias y cuidados indoor.",
      rating: 5
    },
    matchScore: 77
  },
  {
    id: "roma",
    name: "Roma",
    type: "Perro",
    breed: "Golden Retriever",
    age: 5,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Costanera",
    location: loc("Costanera"),
    description: "Dulce, paciente y fanatica de caminar por la Costanera.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["familiar", "tranquilo", "sociable"],
    owner: {
      name: "Valentina Pereyra",
      avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
      bio: "Busco grupos de caminata tranquila por la Costanera.",
      rating: 4.8
    },
    matchScore: 92
  },
  {
    id: "bruno",
    name: "Bruno",
    type: "Perro",
    breed: "Caniche Toy",
    age: 7,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Kuanip",
    location: loc("Kuanip"),
    description: "Senior, tranquilo y perfecto para paseos cortos.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["tranquilo", "companero"],
    owner: {
      name: "Martina Sosa",
      avatarUrl: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=200&q=80",
      bio: "Zona Kuanip. Busco peluqueria canina tranquila para perros senior.",
      rating: 4.6
    },
    matchScore: 81
  },
  {
    id: "mora",
    name: "Mora",
    type: "Perro",
    breed: "Labrador",
    age: 1,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Pipo",
    location: loc("Pipo"),
    description: "Energia alta, ama el barro y aprender comandos nuevos.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1601758064224-c3c3127ba632?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80"],
    isNeutered: false,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["activo", "jugueton"],
    owner: {
      name: "Diego Fernandez",
      avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80",
      bio: "Barrio Pipo. Busco adiestrador local y companeros de paseo.",
      rating: 4.7
    },
    matchScore: 88
  },
  {
    id: "simba",
    name: "Simba",
    type: "Gato",
    breed: "Naranja mestizo",
    age: 2,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    description: "Curioso, sociable con visitas y listo para balcon con red.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: false,
    vaccinesOk: true,
    temperament: ["curioso", "sociable"],
    owner: {
      name: "Agustina Vera",
      avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      bio: "Centro. Comparto tips de gatos indoor en clima frio.",
      rating: 4.8
    },
    matchScore: 74
  },
  {
    id: "kira",
    name: "Kira",
    type: "Perro",
    breed: "Husky Siberiano",
    age: 4,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Parque Nacional",
    location: loc("Parque Nacional"),
    description: "Ama el frio, la nieve y las salidas largas con correa.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1611003228941-98852ba62227?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1517638083100-3f5eb3055a8d?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["activo", "independiente"],
    owner: {
      name: "Julian Godoy",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      bio: "Salidas responsables cerca del Parque Nacional.",
      rating: 4.9
    },
    matchScore: 90
  }
];

export const posts: Post[] = [
  {
    id: "post-1",
    petId: "luna",
    petName: "Luna",
    ownerName: "Sofia Alvarez",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    location: loc("Bahia Encerrada"),
    text: "Hoy fuimos al parque en Ushuaia con Luna. Bahia Encerrada estaba hermosa para caminar.",
    photoUrl: pets[0].mainPhotoUrl,
    createdAt: "2026-05-03T12:40:00.000Z",
    likes: 43,
    comments: 3,
    commentsList: [
      { id: "c1", author: "Martina", text: "La vi! Estaba feliz corriendo." },
      { id: "c2", author: "Nico", text: "Ese circuito es ideal a la tarde." },
      { id: "c3", author: "Camila", text: "Luna siempre sale hermosa en las fotos." }
    ]
  },
  {
    id: "post-2",
    petId: "bruno",
    petName: "Bruno",
    ownerName: "Martina Sosa",
    city: "Ushuaia",
    zone: "Kuanip",
    location: loc("Kuanip"),
    text: "Alguien recomienda veterinario en el centro? Bruno necesita control de rutina.",
    photoUrl: pets[4].mainPhotoUrl,
    createdAt: "2026-05-03T10:15:00.000Z",
    likes: 28,
    comments: 2,
    commentsList: [
      { id: "c4", author: "Sofia", text: "Vet Austral nos atendio muy bien." },
      { id: "c5", author: "Diego", text: "Tambien recomiendo pedir turno temprano." }
    ]
  },
  {
    id: "post-3",
    petId: "toto",
    petName: "Toto",
    ownerName: "Nicolas Mansilla",
    city: "Ushuaia",
    zone: "Andorra",
    location: loc("Andorra"),
    text: "Toto busca companeros para caminar por Andorra este finde. Energia media-alta.",
    photoUrl: pets[1].mainPhotoUrl,
    createdAt: "2026-05-02T18:05:00.000Z",
    likes: 35,
    comments: 2,
    commentsList: [
      { id: "c6", author: "Julian", text: "Kira se suma si el clima acompana." },
      { id: "c7", author: "Valen", text: "Roma es mas tranquila, pero podemos probar." }
    ]
  },
  {
    id: "post-4",
    petId: "roma",
    petName: "Roma",
    ownerName: "Valentina Pereyra",
    city: "Ushuaia",
    zone: "Costanera",
    location: loc("Costanera"),
    text: "Paseo corto por la Costanera antes del viento fuerte. Roma feliz.",
    photoUrl: pets[3].mainPhotoUrl,
    createdAt: "2026-05-02T15:20:00.000Z",
    likes: 51,
    comments: 1,
    commentsList: [{ id: "c8", author: "Agus", text: "La Costanera siempre salva el dia." }]
  },
  {
    id: "post-5",
    petId: "mora",
    petName: "Mora",
    ownerName: "Diego Fernandez",
    city: "Ushuaia",
    zone: "Pipo",
    location: loc("Pipo"),
    text: "Busco adiestrador en Pipo o zona cercana. Mora esta aprendiendo a no tirar la correa.",
    photoUrl: pets[5].mainPhotoUrl,
    createdAt: "2026-05-01T20:00:00.000Z",
    likes: 39,
    comments: 2,
    commentsList: [
      { id: "c9", author: "Nico", text: "Conozco uno que trabaja por turnos." },
      { id: "c10", author: "Sofia", text: "Te paso contacto por mensaje." }
    ]
  },
  {
    id: "post-6",
    petId: "kira",
    petName: "Kira",
    ownerName: "Julian Godoy",
    city: "Ushuaia",
    zone: "Parque Nacional",
    location: loc("Parque Nacional"),
    text: "Recordatorio: en senderos, siempre con correa y respetando fauna local.",
    photoUrl: pets[7].mainPhotoUrl,
    createdAt: "2026-04-30T14:30:00.000Z",
    likes: 62,
    comments: 3,
    commentsList: [
      { id: "c11", author: "Camila", text: "Importantisimo, gracias por decirlo." },
      { id: "c12", author: "Valen", text: "Totalmente. Comunidad responsable." },
      { id: "c13", author: "Diego", text: "Kira es la reina de la nieve." }
    ]
  }
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "vet-austral",
    title: "Vet Austral",
    category: "Veterinaria",
    city: "Ushuaia",
    zone: "Centro",
    description: "Consultas, vacunas y seguimiento para perros y gatos de la ciudad.",
    imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=80",
    priceLabel: "Consulta desde $24.000",
    rating: 4.9,
    reviewCount: 86
  },
  {
    id: "paseos-fin-del-mundo",
    title: "Paseos Fin del Mundo",
    category: "Paseador",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    description: "Paseos reducidos por Costanera y Bahia Encerrada con reporte por salida.",
    imageUrl: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    priceLabel: "$8.000 por paseo",
    rating: 4.8,
    reviewCount: 54
  },
  {
    id: "k9-ushuaia",
    title: "K9 Ushuaia",
    category: "Instructor K9",
    city: "Ushuaia",
    zone: "Pipo",
    description: "Obediencia urbana, correa y socializacion para perros jovenes.",
    imageUrl: "https://images.unsplash.com/photo-1601758064224-c3c3127ba632?auto=format&fit=crop&w=900&q=80",
    priceLabel: "Planes desde $52.000",
    rating: 4.7,
    reviewCount: 39
  },
  {
    id: "guarderia-andorra",
    title: "Guarderia Andorra Pet",
    category: "Guarderia",
    city: "Ushuaia",
    zone: "Andorra",
    description: "Cuidado por dia con cupos limitados, adaptacion previa y patios separados.",
    imageUrl: "https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=900&q=80",
    priceLabel: "$28.000 por dia",
    rating: 4.6,
    reviewCount: 31
  }
];

export const reviews: Review[] = [
  { id: "r1", targetName: "Vet Austral", authorName: "Martina Sosa", rating: 5, text: "Muy buena atencion y paciencia con Bruno." },
  { id: "r2", targetName: "Paseos Fin del Mundo", authorName: "Sofia Alvarez", rating: 5, text: "Luna vuelve tranquila y siempre mandan fotos." },
  { id: "r3", targetName: "K9 Ushuaia", authorName: "Diego Fernandez", rating: 4, text: "Mora mejoro mucho con la correa." },
  { id: "r4", targetName: "Guarderia Andorra Pet", authorName: "Nicolas Mansilla", rating: 5, text: "Toto hizo adaptacion sin estres." }
];
