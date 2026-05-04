import type { ProductListing } from "@/data/platformData";
import { RatingStars } from "./RatingStars";

type ProductCardProps = {
  product: ProductListing;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card marketplace-card">
      <img src={product.imageUrl} alt={product.title} className="card-image" loading="lazy" />
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{product.title}</h3>
            <p>{product.category} | {product.seller}</p>
          </div>
          <span className="pill">{product.price}</span>
        </div>
        <p className="description">{product.zone}, {product.city}</p>
        <div className="card-footer">
          <RatingStars rating={product.rating} />
          <span>{product.reviews} resenas</span>
        </div>
        <button type="button" className="button ghost">Contactar vendedor</button>
      </div>
    </article>
  );
}
