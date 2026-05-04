import Link from "next/link";
import type { Pet } from "@/data/mockData";

type PetCardProps = {
  pet: Pet;
  compact?: boolean;
};

export function PetCard({ pet, compact = false }: PetCardProps) {
  return (
    <article className={compact ? "card pet-card compact" : "card pet-card"}>
      <Link href={`/pets/${pet.id}`} className="image-link">
        <img src={pet.mainPhotoUrl} alt={pet.name} className="card-image" loading="lazy" />
      </Link>
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed} | {pet.zone}, {pet.city}</p>
          </div>
          <span className="pill">{pet.type}</span>
        </div>
        <p className="description">{pet.description}</p>
        <div className="tag-row">
          {pet.temperament.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
