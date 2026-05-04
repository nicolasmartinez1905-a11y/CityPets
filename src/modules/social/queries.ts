import { posts } from "@/data/mockData";

export function getFeedPosts() {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostsByPet(petId: string) {
  return getFeedPosts().filter((post) => post.petId === petId);
}
