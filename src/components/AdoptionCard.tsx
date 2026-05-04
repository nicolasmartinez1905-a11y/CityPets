import { HeartHandshake } from "lucide-react";
import type { AdoptionPet } from "@/data/platformData";

type AdoptionCardProps = {
  pet: AdoptionPet;
};

export function AdoptionCard({ pet }: AdoptionCardProps) {
  return (
    <article className="card pet-card">
      <img src={pet.imageUrl} alt={pet.name} className="card-image" loading="lazy" />
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.age} | {pet.zone}, {pet.city}</p>
          </div>
          <span className="pill">{pet.status}</span>
        </div>
        <p className="description">{pet.description}</p>
        <div className="trust-row">
          <span>{pet.vaccinated ? "Vacunas al dia" : "Vacunas pendientes"}</span>
          <strong><HeartHandshake size={16} /> Adopcion responsable</strong>
        </div>
        <button type="button" className="button">Quiero adoptar</button>
      </div>
    </article>
  );
}
