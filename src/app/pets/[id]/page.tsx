import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, Heart, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { FeedPost } from "@/components/FeedPost";
import { Navbar } from "@/components/Navbar";
import { PageTransition, SlideUp } from "@/components/Motion";
import { Stories } from "@/components/Stories";
import { pets } from "@/data/mockData";
import { getPetById } from "@/modules/pets/queries";
import { getPostsByPet } from "@/modules/social/queries";

type PetProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function PetProfilePage({ params }: PetProfilePageProps) {
  const { id } = await params;
  const pet = getPetById(id);

  if (!pet) {
    notFound();
  }

  const posts = getPostsByPet(pet.id);

  return (
    <PageTransition className="page-shell social-shell">
      <Navbar />
      <Stories pets={pets} />

      <section className="pet-profile-cover">
        <img src={pet.mainPhotoUrl} alt={pet.name} className="pet-cover-image" />
        <div className="pet-cover-overlay" />
        <div className="pet-profile-content">
          <div className="pet-avatar-wrap">
            <img src={pet.mainPhotoUrl} alt={pet.name} className="pet-avatar-large" />
          </div>
          <div className="pet-profile-copy">
            <span className="eyebrow">Perfil CityPets</span>
            <h1>{pet.name}</h1>
            <p>
              {pet.type} | {pet.breed} | {pet.zone}, {pet.city}
            </p>
            <div className="profile-actions">
              <Link className="button" href="/match">
                <Heart size={18} /> Conectar
              </Link>
              <Link className="button glass" href="/feed">
                <MessageCircle size={18} /> Enviar mensaje
              </Link>
            </div>
          </div>
          <aside className="owner-card">
            <img src={pet.owner.avatarUrl} alt={pet.owner.name} />
            <strong>{pet.owner.name}</strong>
            <span>
              <MapPin size={14} /> {pet.city}
            </span>
          </aside>
        </div>
      </section>

      <section className="pet-profile-grid">
        <SlideUp>
          <article className="profile-panel pet-bio-card">
            <span className="eyebrow">La ciudad tambien es de ellos</span>
            <h2>{pet.description}</h2>
            <p className="muted">{pet.owner.bio}</p>
            <div className="tag-row">
              {pet.temperament.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </SlideUp>

        <SlideUp delay={0.05}>
          <article className="profile-panel">
            <span className="eyebrow">Datos de cuidado</span>
            <div className="profile-facts">
              <div className="fact">
                <span>Edad</span>
                <strong>{pet.age} anos</strong>
              </div>
              <div className="fact">
                <span>Sexo</span>
                <strong>{pet.sex}</strong>
              </div>
              <div className="fact">
                <span>Castracion</span>
                <strong>{pet.isNeutered ? "Si" : "No"}</strong>
              </div>
              <div className="fact">
                <span>Vacunas</span>
                <strong>{pet.vaccinesOk ? "Al dia" : "Pendiente"}</strong>
              </div>
              <div className="fact">
                <span>Chip</span>
                <strong>{pet.hasChip ? "Si" : "No"}</strong>
              </div>
              <div className="fact">
                <span>Confianza</span>
                <strong>
                  <ShieldCheck size={16} /> Verificado
                </strong>
              </div>
            </div>
          </article>
        </SlideUp>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Momentos</span>
            <h2>Galeria urbana</h2>
            <p className="muted">Paseos, plazas y escenas cotidianas de {pet.name}.</p>
          </div>
          <Link className="button ghost" href="/feed">
            <Camera size={18} /> Subir foto
          </Link>
        </div>
        <div className="grid two">
          {pet.gallery.map((photo, index) => (
            <SlideUp key={photo} delay={index * 0.05}>
              <img src={photo} alt={`${pet.name} galeria`} className="profile-hero gallery-photo" />
            </SlideUp>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Actividad</span>
            <h2>Publicaciones de {pet.name}</h2>
            <p className="muted">Historias compartidas con la comunidad CityPets.</p>
          </div>
        </div>
        <div className="grid two">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
