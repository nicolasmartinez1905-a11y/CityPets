import { pets } from "@/data/mockData";

export function getFeaturedPets() {
  return pets.slice(0, 4);
}

export function getPetById(id: string) {
  return pets.find((pet) => pet.id === id);
}

export function getMatchCandidates() {
  return [...pets].sort((a, b) => b.matchScore - a.matchScore);
}
