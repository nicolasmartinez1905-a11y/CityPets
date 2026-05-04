import { marketplaceItems, reviews } from "@/data/mockData";

export function getMarketplaceItems() {
  return marketplaceItems;
}

export function getTopMarketplaceItems() {
  return [...marketplaceItems].sort((a, b) => b.rating - a.rating).slice(0, 4);
}

export function getReviews() {
  return reviews;
}
