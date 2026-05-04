import type { Pet, Post } from "@/data/mockData";
import type { ServiceProfile } from "@/data/platformData";

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  avatarUrl: string;
  bio: string;
  role: "user" | "admin";
  emailVerified: boolean;
  verificationStatus: "pendiente" | "aprobado" | "rechazado";
};

export type LocalAppState = {
  currentUserId: string | null;
  users: LocalUser[];
  pets: Pet[];
  posts: Post[];
  services: ServiceProfile[];
  notices: string[];
};

const STORAGE_KEY = "citypets_ushuaia_state";

export function createEmptyState(): LocalAppState {
  return {
    currentUserId: null,
    users: [],
    pets: [],
    posts: [],
    services: [],
    notices: []
  };
}

export function loadLocalState(): LocalAppState {
  if (typeof window === "undefined") {
    return createEmptyState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return createEmptyState();
  }

  try {
    return { ...createEmptyState(), ...JSON.parse(raw) } as LocalAppState;
  } catch {
    return createEmptyState();
  }
}

export function saveLocalState(state: LocalAppState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("citypets-state"));
}

export function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
