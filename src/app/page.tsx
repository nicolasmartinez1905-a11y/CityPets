import Link from "next/link";
import { Heart, MapPin, MessageCircle, PawPrint } from "lucide-react";
import { FeedPost } from "@/components/FeedPost";
import { Navbar } from "@/components/Navbar";
import { OptimizedHero } from "@/components/OptimizedHero";
import { PageTransition, SlideUp } from "@/components/Motion";
import { PetCard } from "@/components/PetCard";
import { Stories } from "@/components/Stories";
import { pets, posts } from "@/data/mockData";
import { getFeaturedPets } from "@/modules/pets/queries";

const communityStats = [
  { label: "Mascotas en demo", value: "15" },
  { label: "Historias locales", value: "20" },
  { label: "Zonas de Ushuaia", value: "7" }
];

export default function HomePage() {
  const featuredPets = getFeaturedPets().slice(0, 8);

  return (
    <PageTransition className="page-shell">
      <Navbar />
      <OptimizedHero showPreview={false} />

      <section className="section emotional-intro">
        <SlideUp>
          <article className="manifest-card home-manifest">
            <span className="eyebrow">CityPets Ushuaia</span>
            <h2>Tu mascota también tiene una historia que merece ser compartida.</h2>
            <p>
              CityPets es una red social para personas que aman a sus mascotas. Un lugar para subir
              paseos, pedir recomendaciones, encontrar vecinos con la misma rutina y sentir que no
              estás criando a tu compañero de vida en soledad.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/registro">
                <PawPrint size={18} /> Sumate con tu mascota
              </Link>
              <Link className="button ghost" href="/feed">
                Ver historias reales
              </Link>
            </div>
          </article>
        </SlideUp>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Comunidad viva</span>
            <h2>Historias que se sienten de barrio</h2>
            <p className="muted">
              Nieve, viento, bosque, ventanas con gatos y paseos cortos por la Costanera. CityPets
              empieza en Ushuaia con una comunidad cercana y real.
            </p>
          </div>
          <Link className="button ghost" href="/feed">
            Ir al feed
          </Link>
        </div>
        <Stories pets={pets} />
        <div className="grid two">
          {posts.slice(0, 2).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Compañeros de vida</span>
            <h2>Perros y gatos con personalidad propia</h2>
            <p className="muted">
              No son perfiles vacíos: cada mascota tiene nombre, rutina, carácter y una forma muy
              suya de habitar la ciudad.
            </p>
          </div>
          <Link className="button ghost" href="/match">
            Conocer mascotas
          </Link>
        </div>
        <div className="grid four-cards">
          {featuredPets.map((pet, index) => (
            <SlideUp key={pet.id} delay={index * 0.04}>
              <PetCard pet={pet} compact />
            </SlideUp>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid three">
          {communityStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="manifest-card community-card">
          <span className="eyebrow">La ciudad también es de ellos</span>
          <h2>Un lugar simple para cuidar, compartir y acompañarnos.</h2>
          <p>
            Pedí una recomendación de veterinaria, contá una pequeña victoria del paseo, buscá una
            caminata tranquila para un perro senior o compartí esa foto que solo otro tutor entiende.
          </p>
          <div className="trust-row">
            <span><Heart size={18} /> Historias cotidianas</span>
            <span><MessageCircle size={18} /> Conversaciones cercanas</span>
            <span><MapPin size={18} /> Contexto local de Ushuaia</span>
          </div>
        </article>
      </section>
    </PageTransition>
  );
}
