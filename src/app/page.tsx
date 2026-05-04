import Link from "next/link";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { Navbar } from "@/components/Navbar";
import { NearbySection } from "@/components/NearbySection";
import { OptimizedHero } from "@/components/OptimizedHero";
import { PageTransition, SlideUp } from "@/components/Motion";
import { PetCard } from "@/components/PetCard";
import { PlanCard } from "@/components/PlanCard";
import { plans } from "@/data/platformData";
import { getTopMarketplaceItems } from "@/modules/marketplace/queries";
import { getFeaturedPets } from "@/modules/pets/queries";

export default function HomePage() {
  const featuredPets = getFeaturedPets();
  const topItems = getTopMarketplaceItems();

  return (
    <PageTransition className="page-shell">
      <Navbar />
      <OptimizedHero />

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Comunidad</span>
            <h2>Mascotas que hacen Ushuaia</h2>
            <p className="muted">Bahia Encerrada, Costanera, Andorra, Pipo y caminatas con frio austral.</p>
          </div>
          <Link className="button ghost" href="/match">
            Ver comunidad
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
        <NearbySection />
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Servicios cerca</span>
            <h2>Red social, servicios, tienda y adopcion</h2>
            <p className="muted">Una plataforma con reputacion, intermediacion y bienestar animal.</p>
          </div>
          <Link className="button ghost" href="/servicios">
            Ver servicios
          </Link>
        </div>
        <div className="grid two">
          {topItems.map((item, index) => (
            <SlideUp key={item.id} delay={index * 0.04}>
              <MarketplaceCard item={item} />
            </SlideUp>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SaaS monetizable</span>
            <h2>Planes para usuarios, tutores premium y profesionales</h2>
            <p className="muted">Badge verificado, mayor visibilidad, publicaciones destacadas y perfiles profesionales.</p>
          </div>
          <Link className="button ghost" href="/marketplace">
            Ver modelo
          </Link>
        </div>
        <div className="grid three">
          {plans.map((plan, index) => (
            <SlideUp key={plan.name} delay={index * 0.04}>
              <PlanCard plan={plan} />
            </SlideUp>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="manifest-card">
          <span className="eyebrow">Impacto real</span>
          <h2>Monetizar sin perder de vista el bienestar animal.</h2>
          <p>
            CityPets organiza el mercado informal de servicios y productos para mascotas con
            verificacion, reputacion, normas claras, adopcion responsable y moderacion comunitaria.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/bienestar">Bienestar y transparencia</Link>
            <Link className="button ghost" href="/quienes-somos">Quienes somos</Link>
          </div>
        </article>
      </section>
    </PageTransition>
  );
}
