import { MatchCard } from "@/components/MatchCard";
import { Navbar } from "@/components/Navbar";
import { PageTransition, SlideUp } from "@/components/Motion";
import { getMatchCandidates } from "@/modules/pets/queries";

export default function MatchPage() {
  const candidates = getMatchCandidates();

  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Match urbano</span>
        <h1>Mascotas compatibles cerca tuyo</h1>
        <p>Descubri companeros de paseo por ciudad, energia y temperamento.</p>
      </section>
      <section className="grid three">
        {candidates.map((pet, index) => (
          <SlideUp key={pet.id} delay={index * 0.03}>
            <MatchCard pet={pet} />
          </SlideUp>
        ))}
      </section>
    </PageTransition>
  );
}
