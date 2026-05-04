import Link from "next/link";
import { MapPin, PawPrint, Sparkles } from "lucide-react";
import type { Pet } from "@/data/mockData";

type PetCardProps = {
  pet: Pet;
  compact?: boolean;
};

export function PetCard({ pet, compact = false }: PetCardProps) {
  const shortDescription = pet.description.replace(/\.$/, "");
  const primaryTemperament = pet.temperament[0] ?? "compañero";

  return (
    <article className={compact ? "card pet-card compact" : "card pet-card"}>
      <Link href={`/pets/${pet.id}`} className="image-link pet-image-link">
        <img src={pet.mainPhotoUrl} alt={pet.name} className="card-image" loading="lazy" />
        <div className="pet-hover-info">
          <span>
            <Sparkles size={15} /> {pet.age} años · {pet.sex}
          </span>
          <span>{pet.temperament.slice(0, 3).join(" · ")}</span>
        </div>
      </Link>
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{pet.name}</h3>
            <p className="pet-main-meta">
              <PawPrint size={14} /> {pet.type} · {pet.breed}
            </p>
          </div>
          <span className="pill">{primaryTemperament}</span>
        </div>
        <p className="description pet-description">{shortDescription}</p>
        <div className="pet-card-footer">
          <span className="pet-location">
            <MapPin size={14} /> {pet.zone}
          </span>
          <div className="pet-card-actions">
            <Link className="pet-secondary-action" href="/match">
              Paseo
            </Link>
            <Link className="pet-primary-action" href={`/pets/${pet.id}`}>
              Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
