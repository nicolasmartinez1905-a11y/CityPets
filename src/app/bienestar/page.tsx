import { ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageTransition, SlideUp } from "@/components/Motion";
import { trustRules } from "@/data/platformData";

export default function WelfarePage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Bienestar y transparencia</span>
        <h1>Una plataforma comercial con reglas de cuidado animal</h1>
        <p>La monetizacion solo tiene sentido si mejora la confianza, la trazabilidad y el bienestar.</p>
      </section>
      <section className="grid two">
        {trustRules.map((rule, index) => (
          <SlideUp key={rule} delay={index * 0.04}>
            <article className="policy-card">
              <ShieldCheck size={24} />
              <p>{rule}</p>
            </article>
          </SlideUp>
        ))}
      </section>
      <section className="section">
        <article className="manifest-card">
          <span className="eyebrow">Criadores verificados</span>
          <h2>Solo con documentacion, vacunas, certificados y trazabilidad.</h2>
          <p>
            CityPets no promueve la cria informal. Cualquier criador debe demostrar condiciones de
            bienestar, historial transparente, controles veterinarios y reputacion publica.
          </p>
        </article>
      </section>
    </PageTransition>
  );
}
