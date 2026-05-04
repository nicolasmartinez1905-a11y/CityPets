import Link from "next/link";
import type { Pet } from "@/data/mockData";

type StoriesProps = {
  pets: Pet[];
};

export function Stories({ pets }: StoriesProps) {
  return (
    <section className="stories-shell" aria-label="Historias de mascotas">
      {pets.map((pet) => (
        <Link key={pet.id} href={`/pets/${pet.id}`} className="story-item">
          <span className="story-ring">
            <img src={pet.mainPhotoUrl} alt={pet.name} />
          </span>
          <strong>{pet.name}</strong>
          <small>{pet.zone}</small>
        </Link>
      ))}
    </section>
  );
}
