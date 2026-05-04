import { MapPin } from "lucide-react";
import { pets, posts } from "@/data/mockData";
import { services } from "@/data/platformData";
import { LocalMap } from "./LocalMap";
import { RatingStars } from "./RatingStars";

export function NearbySection() {
  const nearPets = pets.filter((pet) => ["Centro", "Bahia Encerrada", "Costanera"].includes(pet.zone));
  const nearServices = services.filter((service) => ["Centro", "Bahia Encerrada", "Costanera"].includes(service.zone));
  const localPosts = posts.slice(0, 3);

  return (
    <section className="nearby-grid">
      <article className="nearby-card">
        <span className="eyebrow">Cerca tuyo</span>
        <h2>Conectando la comunidad pet de Ushuaia</h2>
        <p className="muted">Filtrado por ciudad y zonas locales. Hoy estas viendo Ushuaia.</p>
        <div className="nearby-list">
          {nearPets.slice(0, 3).map((pet) => (
            <div key={pet.id} className="nearby-row">
              <img src={pet.mainPhotoUrl} alt={pet.name} />
              <div>
                <strong>{pet.name}</strong>
                <span><MapPin size={13} /> {pet.zone}</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="nearby-card">
        <span className="eyebrow">Servicios disponibles cerca tuyo</span>
        <div className="nearby-list">
          {nearServices.slice(0, 3).map((service) => (
            <div key={service.id} className="nearby-row">
              <img src={service.imageUrl} alt={service.name} />
              <div>
                <strong>{service.name}</strong>
                <span>{service.zone} | {service.price}</span>
                <RatingStars rating={service.rating} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="nearby-card">
        <span className="eyebrow">Publicaciones locales</span>
        <div className="nearby-list text-only">
          {localPosts.map((post) => (
            <p key={post.id}>
              <strong>{post.petName}</strong> en {post.zone}: {post.text}
            </p>
          ))}
        </div>
      </article>

      <LocalMap pets={pets} services={services} />
    </section>
  );
}
