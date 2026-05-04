import { AdoptionCard } from "@/components/AdoptionCard";
import { Navbar } from "@/components/Navbar";
import { PageTransition, SlideUp } from "@/components/Motion";
import { adoptionPets } from "@/data/platformData";

export default function AdoptionPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Adopcion responsable</span>
        <h1>Encontrar familia tambien es parte de la comunidad</h1>
        <p>Publicaciones claras, filtros y reglas para proteger animales en adopcion y transito.</p>
      </section>
      <section className="grid three">
        {adoptionPets.map((pet, index) => (
          <SlideUp key={pet.id} delay={index * 0.04}>
            <AdoptionCard pet={pet} />
          </SlideUp>
        ))}
      </section>
    </PageTransition>
  );
}
