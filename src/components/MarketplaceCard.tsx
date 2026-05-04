import type { MarketplaceItem } from "@/data/mockData";
import { RatingStars } from "./RatingStars";

type MarketplaceCardProps = {
  item: MarketplaceItem;
};

export function MarketplaceCard({ item }: MarketplaceCardProps) {
  return (
    <article className="card marketplace-card">
      <img src={item.imageUrl} alt={item.title} className="card-image" />
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{item.title}</h3>
            <p>{item.category} | {item.city}</p>
          </div>
          <span className="pill">{item.priceLabel}</span>
        </div>
        <p className="description">{item.description}</p>
        <div className="card-footer">
          <RatingStars rating={item.rating} />
          <span>{item.reviewCount} resenas</span>
        </div>
      </div>
    </article>
  );
}
