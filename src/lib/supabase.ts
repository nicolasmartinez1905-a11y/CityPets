import { createClient } from "@supabase/supabase-js";

export type CityPetsDatabase = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          nombre: string;
          email: string;
          ciudad: string;
          zona: string | null;
          foto_url: string | null;
          bio: string | null;
          verificado: boolean;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          nombre: string;
          email: string;
          ciudad?: string;
          zona?: string | null;
          foto_url?: string | null;
          bio?: string | null;
          verificado?: boolean;
          role?: string;
        };
        Update: Partial<CityPetsDatabase["public"]["Tables"]["users"]["Insert"]>;
        Relationships: [];
      };
      mascotas: {
        Row: {
          id: string;
          user_id: string;
          nombre: string;
          especie: string;
          raza: string | null;
          edad: number | null;
          ciudad: string;
          zona: string | null;
          foto_url: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          nombre: string;
          especie: string;
          raza?: string | null;
          edad?: number | null;
          ciudad?: string;
          zona?: string | null;
          foto_url?: string | null;
        };
        Update: Partial<CityPetsDatabase["public"]["Tables"]["mascotas"]["Insert"]>;
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          mascota_id: string | null;
          imagen_url: string | null;
          descripcion: string;
          ciudad: string;
          zona: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          mascota_id?: string | null;
          imagen_url?: string | null;
          descripcion: string;
          ciudad?: string;
          zona?: string | null;
        };
        Update: Partial<CityPetsDatabase["public"]["Tables"]["posts"]["Insert"]>;
        Relationships: [];
      };
      likes: {
        Row: { id: string; user_id: string; post_id: string; created_at: string };
        Insert: { user_id: string; post_id: string };
        Update: never;
        Relationships: [];
      };
      comentarios: {
        Row: { id: string; user_id: string; post_id: string; texto: string; created_at: string };
        Insert: { user_id: string; post_id: string; texto: string };
        Update: never;
        Relationships: [];
      };
      servicios: {
        Row: {
          id: string;
          user_id: string;
          titulo: string;
          descripcion: string;
          precio: string | null;
          ciudad: string;
          zona: string | null;
          categoria: string;
          imagen_url: string | null;
          verificado: boolean;
          rating: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          titulo: string;
          descripcion: string;
          precio?: string | null;
          ciudad?: string;
          zona?: string | null;
          categoria?: string;
          imagen_url?: string | null;
        };
        Update: Partial<CityPetsDatabase["public"]["Tables"]["servicios"]["Insert"]> & {
          verificado?: boolean;
          rating?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

function getRawSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? ""
  };
}

function getUrlProjectRef(url: string) {
  try {
    const host = new URL(url).host;
    return host.endsWith(".supabase.co") ? host.replace(".supabase.co", "") : "";
  } catch {
    return "";
  }
}

function decodeAnonKeyProjectRef(anonKey: string) {
  try {
    const payload = anonKey.split(".")[1];
    if (!payload) return "";
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const decoded = JSON.parse(atob(padded)) as { ref?: string };
    return decoded.ref ?? "";
  } catch {
    return "";
  }
}

export function getSupabaseConfigDiagnostics() {
  const { url, anonKey } = getRawSupabaseConfig();
  let urlHost = "";

  try {
    urlHost = url ? new URL(url).host : "";
  } catch {
    urlHost = "URL invalida";
  }

  return {
    urlExists: Boolean(url),
    urlEndsWithSupabaseCo: /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url),
    urlHost,
    urlProjectRef: getUrlProjectRef(url),
    anonKeyProjectRef: decodeAnonKeyProjectRef(anonKey),
    anonKeyExists: Boolean(anonKey),
    anonKeyLength: anonKey.length,
    anonKeyJwtSegments: anonKey ? anonKey.split(".").length : 0,
    anonKeyLooksTruncated: anonKey.includes("..."),
    anonKeyPreview: anonKey
      ? `${anonKey.slice(0, 10)}...${anonKey.slice(Math.max(0, anonKey.length - 6))}`
      : ""
  };
}

export function logSupabaseConfigDiagnostics(context: string) {
  console.info(`[CityPets Supabase] ${context}`, getSupabaseConfigDiagnostics());
}

export function hasSupabaseConfig() {
  const diagnostics = getSupabaseConfigDiagnostics();
  return (
    diagnostics.urlExists &&
    diagnostics.urlEndsWithSupabaseCo &&
    diagnostics.urlProjectRef === diagnostics.anonKeyProjectRef &&
    diagnostics.anonKeyExists &&
    diagnostics.anonKeyJwtSegments === 3 &&
    !diagnostics.anonKeyLooksTruncated
  );
}

export function getSupabase() {
  const { url, anonKey } = getRawSupabaseConfig();

  if (!hasSupabaseConfig()) {
    logSupabaseConfigDiagnostics("configuracion-invalida");
    throw new Error(
      "Configuracion Supabase invalida: revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createClient<CityPetsDatabase>(url, anonKey);
}
