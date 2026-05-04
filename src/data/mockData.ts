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
  },
  {
    id: "olivia",
    name: "Olivia",
    type: "Perro",
    breed: "Mestiza mediana",
    age: 6,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    description: "Mansa, observadora y fan de entrar a cafes pet friendly despues de pasear.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["tranquila", "companera", "mimosa"],
    owner: {
      name: "Florencia Ibarra",
      avatarUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=200&q=80",
      bio: "Centro. Olivia es mi sombra y mi excusa para caminar todos los dias.",
      rating: 4.9
    },
    matchScore: 84
  },
  {
    id: "felix",
    name: "Felix",
    type: "Gato",
    breed: "Atigrado",
    age: 5,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Kuanip",
    location: loc("Kuanip"),
    description: "Dormilon profesional, le encanta mirar el movimiento del barrio desde la ventana.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: false,
    vaccinesOk: true,
    temperament: ["tranquilo", "curioso", "independiente"],
    owner: {
      name: "Rocio Medina",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Kuanip. Gatos indoor, redes en ventanas y mantitas por todos lados.",
      rating: 4.8
    },
    matchScore: 73
  },
  {
    id: "tango",
    name: "Tango",
    type: "Perro",
    breed: "Dachshund",
    age: 2,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Costanera",
    location: loc("Costanera"),
    description: "Chiquito con actitud enorme: se planta contra el viento como si fuera del CADIC.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1629740067905-bd3f515aa739?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["valiente", "jugueton", "territorial"],
    owner: {
      name: "Pablo Quiroga",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      bio: "Costanera. Caminatas cortas, mucho abrigo y mate mirando la bahia.",
      rating: 4.7
    },
    matchScore: 79
  },
  {
    id: "uma",
    name: "Uma",
    type: "Perro",
    breed: "Pastor Aleman",
    age: 4,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Andorra",
    location: loc("Andorra"),
    description: "Protectora, noble y muy sensible: si alguien esta triste, se apoya al lado.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["noble", "protectora", "obediente"],
    owner: {
      name: "Laura Benitez",
      avatarUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200&q=80",
      bio: "Andorra. Uma y yo caminamos temprano, antes de que cambie el clima.",
      rating: 4.9
    },
    matchScore: 91
  },
  {
    id: "milo",
    name: "Milo",
    type: "Gato",
    breed: "Blanco y negro",
    age: 3,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    location: loc("Bahia Encerrada"),
    description: "Charlatan, demandante y convencido de que cada caja que entra a casa es suya.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: false,
    vaccinesOk: true,
    temperament: ["charlatan", "mimoso", "curioso"],
    owner: {
      name: "Belen Rojas",
      avatarUrl: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=200&q=80",
      bio: "Bahia Encerrada. Milo gobierna la casa y yo pago el alquiler.",
      rating: 4.8
    },
    matchScore: 76
  },
  {
    id: "chalten",
    name: "Chalten",
    type: "Perro",
    breed: "Mestizo grande",
    age: 8,
    sex: "Macho",
    city: "Ushuaia",
    zone: "Parque Nacional",
    location: loc("Parque Nacional"),
    description: "Adulto sereno, ama caminar lento y olfatear cada rincon del bosque.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["sereno", "companero", "paciente"],
    owner: {
      name: "Esteban Morales",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Parque Nacional. Paseos responsables, sin apuro y con bolsita siempre.",
      rating: 5
    },
    matchScore: 86
  },
  {
    id: "pampa",
    name: "Pampa",
    type: "Perro",
    breed: "Beagle",
    age: 3,
    sex: "Hembra",
    city: "Ushuaia",
    zone: "Pipo",
    location: loc("Pipo"),
    description: "Nariz inquieta, corazon enorme y cero respeto por las medias limpias.",
    mainPhotoUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80"],
    isNeutered: true,
    hasChip: true,
    vaccinesOk: true,
    temperament: ["curiosa", "activa", "glotona"],
    owner: {
      name: "Carolina Ruiz",
      avatarUrl: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=80",
      bio: "Pipo. Pampa necesita gastar energia, yo necesito cafe.",
      rating: 4.7
    },
    matchScore: 87
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
  },
  {
    id: "post-7",
    petId: "olivia",
    petName: "Olivia",
    ownerName: "Florencia Ibarra",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    text: "Olivia descubrio que si se sienta seria frente a la panaderia, alguien siempre le dice linda. Funciona demasiado bien.",
    photoUrl: pets[8].mainPhotoUrl,
    createdAt: "2026-05-03T09:05:00.000Z",
    likes: 44,
    comments: 3,
    commentsList: [
      { id: "c14", author: "Rocio", text: "La estrategia de Olivia es impecable." },
      { id: "c15", author: "Pablo", text: "Tango hace lo mismo pero ladra primero." },
      { id: "c16", author: "Sofia", text: "Hermosa esa mirada." }
    ]
  },
  {
    id: "post-8",
    petId: "felix",
    petName: "Felix",
    ownerName: "Rocio Medina",
    city: "Ushuaia",
    zone: "Kuanip",
    location: loc("Kuanip"),
    text: "Dia de viento fuerte: Felix voto quedarse adentro, mirar nieve por la ventana y reclamar mantita nueva.",
    photoUrl: pets[9].mainPhotoUrl,
    createdAt: "2026-05-02T21:12:00.000Z",
    likes: 31,
    comments: 2,
    commentsList: [
      { id: "c17", author: "Belen", text: "Milo aprueba ese plan." },
      { id: "c18", author: "Camila", text: "Gatos fueguinos: sabios del clima." }
    ]
  },
  {
    id: "post-9",
    petId: "tango",
    petName: "Tango",
    ownerName: "Pablo Quiroga",
    city: "Ushuaia",
    zone: "Costanera",
    location: loc("Costanera"),
    text: "Tango camino 8 cuadras y despues pidio upa como si hubiera cruzado toda la isla.",
    photoUrl: pets[10].mainPhotoUrl,
    createdAt: "2026-05-02T19:33:00.000Z",
    likes: 58,
    comments: 4,
    commentsList: [
      { id: "c19", author: "Flor", text: "Un deportista de elite." },
      { id: "c20", author: "Valen", text: "Roma lo entiende." },
      { id: "c21", author: "Diego", text: "Mora haria 8 km y seguiria." }
    ]
  },
  {
    id: "post-10",
    petId: "uma",
    petName: "Uma",
    ownerName: "Laura Benitez",
    city: "Ushuaia",
    zone: "Andorra",
    location: loc("Andorra"),
    text: "Alguien sabe si hay grupo de paseo temprano por Andorra? Uma camina tranquila pero necesita amigos pacientes.",
    photoUrl: pets[11].mainPhotoUrl,
    createdAt: "2026-05-02T08:26:00.000Z",
    likes: 37,
    comments: 3,
    commentsList: [
      { id: "c22", author: "Nicolas", text: "Toto sale temprano los sabados." },
      { id: "c23", author: "Esteban", text: "Chalten va lento, puede ser buen match." },
      { id: "c24", author: "Sofia", text: "Me sumo si no llueve." }
    ]
  },
  {
    id: "post-11",
    petId: "milo",
    petName: "Milo",
    ownerName: "Belen Rojas",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    location: loc("Bahia Encerrada"),
    text: "Milo tiro una planta y despues se acosto al lado como testigo preocupado. Necesito consejos para gatos con complejo de jardinero.",
    photoUrl: pets[12].mainPhotoUrl,
    createdAt: "2026-05-01T22:18:00.000Z",
    likes: 46,
    comments: 4,
    commentsList: [
      { id: "c25", author: "Camila", text: "Macetas pesadas y mucha paciencia." },
      { id: "c26", author: "Rocio", text: "Felix tambien investiga plantas." },
      { id: "c27", author: "Agus", text: "No fue Milo, fue el viento." }
    ]
  },
  {
    id: "post-12",
    petId: "chalten",
    petName: "Chalten",
    ownerName: "Esteban Morales",
    city: "Ushuaia",
    zone: "Parque Nacional",
    location: loc("Parque Nacional"),
    text: "Chalten hoy camino despacio, olfateo todo y me recordo que pasear tambien puede ser bajar un cambio.",
    photoUrl: pets[13].mainPhotoUrl,
    createdAt: "2026-05-01T16:44:00.000Z",
    likes: 72,
    comments: 5,
    commentsList: [
      { id: "c28", author: "Laura", text: "Que lindo leer esto." },
      { id: "c29", author: "Valen", text: "Los perros grandes ensenan paciencia." },
      { id: "c30", author: "Julian", text: "Hermoso Chalten." }
    ]
  },
  {
    id: "post-13",
    petId: "pampa",
    petName: "Pampa",
    ownerName: "Carolina Ruiz",
    city: "Ushuaia",
    zone: "Pipo",
    location: loc("Pipo"),
    text: "Pampa encontro barro donde yo juro que no habia barro. Beagles: tecnologia de deteccion avanzada.",
    photoUrl: pets[14].mainPhotoUrl,
    createdAt: "2026-04-30T19:07:00.000Z",
    likes: 64,
    comments: 4,
    commentsList: [
      { id: "c31", author: "Diego", text: "Mora tiene el mismo radar." },
      { id: "c32", author: "Flor", text: "Foto post-bano por favor." },
      { id: "c33", author: "Pablo", text: "Tango evita charcos como si fueran lava." }
    ]
  },
  {
    id: "post-14",
    petId: "nina",
    petName: "Nina",
    ownerName: "Camila Torres",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    text: "Consulta seria: que arena para gatos les funciona mejor con calefaccion prendida todo el dia?",
    photoUrl: pets[2].mainPhotoUrl,
    createdAt: "2026-04-30T11:22:00.000Z",
    likes: 22,
    comments: 3,
    commentsList: [
      { id: "c34", author: "Rocio", text: "Aglomerante sin perfume, lejos." },
      { id: "c35", author: "Belen", text: "Milo acepta una sola marca, obvio." },
      { id: "c36", author: "Agustina", text: "Te paso dato por privado." }
    ]
  },
  {
    id: "post-15",
    petId: "simba",
    petName: "Simba",
    ownerName: "Agustina Vera",
    city: "Ushuaia",
    zone: "Centro",
    location: loc("Centro"),
    text: "Simba descubrio la bolsa de la compra y decidio que era su nueva cabana de invierno.",
    photoUrl: pets[6].mainPhotoUrl,
    createdAt: "2026-04-29T20:55:00.000Z",
    likes: 33,
    comments: 2,
    commentsList: [
      { id: "c37", author: "Camila", text: "Arquitectura felina." },
      { id: "c38", author: "Belen", text: "Milo exige una igual." }
    ]
  },
  {
    id: "post-16",
    petId: "roma",
    petName: "Roma",
    ownerName: "Valentina Pereyra",
    city: "Ushuaia",
    zone: "Costanera",
    location: loc("Costanera"),
    text: "Si alguien tiene perro senior, armemos caminata corta por Costanera. Sin apuro, con pausas y abrigo.",
    photoUrl: pets[3].gallery[0],
    createdAt: "2026-04-29T17:30:00.000Z",
    likes: 49,
    comments: 4,
    commentsList: [
      { id: "c39", author: "Martina", text: "Bruno se suma." },
      { id: "c40", author: "Esteban", text: "Chalten tambien." },
      { id: "c41", author: "Flor", text: "Olivia va tranquila." }
    ]
  },
  {
    id: "post-17",
    petId: "mora",
    petName: "Mora",
    ownerName: "Diego Fernandez",
    city: "Ushuaia",
    zone: "Pipo",
    location: loc("Pipo"),
    text: "Primer dia que Mora vuelve cuando la llamo aunque haya pajaros cerca. Pequena victoria de martes.",
    photoUrl: pets[5].gallery[0],
    createdAt: "2026-04-28T18:12:00.000Z",
    likes: 81,
    comments: 5,
    commentsList: [
      { id: "c42", author: "Laura", text: "Eso vale oro." },
      { id: "c43", author: "Julian", text: "Con Kira seguimos practicando." },
      { id: "c44", author: "Carolina", text: "Pampa se rie de mi desde lejos." }
    ]
  },
  {
    id: "post-18",
    petId: "luna",
    petName: "Luna",
    ownerName: "Sofia Alvarez",
    city: "Ushuaia",
    zone: "Bahia Encerrada",
    location: loc("Bahia Encerrada"),
    text: "Luna se quedo mirando la nieve caer como si fuera la primera vez. A veces ellos hacen que una tarde comun sea enorme.",
    photoUrl: pets[0].gallery[0],
    createdAt: "2026-04-28T12:10:00.000Z",
    likes: 94,
    comments: 6,
    commentsList: [
      { id: "c45", author: "Flor", text: "Que frase hermosa." },
      { id: "c46", author: "Nico", text: "Los perros tienen ese poder." },
      { id: "c47", author: "Valen", text: "Roma igual con el mar." }
    ]
  },
  {
    id: "post-19",
    petId: "toto",
    petName: "Toto",
    ownerName: "Nicolas Mansilla",
    city: "Ushuaia",
    zone: "Andorra",
    location: loc("Andorra"),
    text: "Toto volvio del bosque con una ramita que claramente considera tesoro familiar.",
    photoUrl: pets[1].gallery[0],
    createdAt: "2026-04-27T15:48:00.000Z",
    likes: 57,
    comments: 3,
    commentsList: [
      { id: "c48", author: "Esteban", text: "Chalten colecciona piedras." },
      { id: "c49", author: "Sofia", text: "Luna trae hojas." },
      { id: "c50", author: "Carolina", text: "Pampa trae medias robadas." }
    ]
  },
  {
    id: "post-20",
    petId: "kira",
    petName: "Kira",
    ownerName: "Julian Godoy",
    city: "Ushuaia",
    zone: "Parque Nacional",
    location: loc("Parque Nacional"),
    text: "Kira, husky de 4 anos, ama correr en la nieve y siempre intenta negociar cinco minutos mas de paseo.",
    photoUrl: pets[7].gallery[0],
    createdAt: "2026-04-26T13:36:00.000Z",
    likes: 88,
    comments: 5,
    commentsList: [
      { id: "c51", author: "Laura", text: "Uma tambien negocia." },
      { id: "c52", author: "Diego", text: "Cinco minutos que son media hora." },
      { id: "c53", author: "Camila", text: "Kira nacio para la nieve." }
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
  { id: "r4", targetName: "Guarderia Andorra Pet", authorName: "Nicolas Mansilla", rating: 5, text: "Toto hizo adaptacion sin estres." },
  { id: "r5", targetName: "Paseos Fin del Mundo", authorName: "Valentina Pereyra", rating: 5, text: "Cuidaron el ritmo de Roma, que ya es senior." }
];
