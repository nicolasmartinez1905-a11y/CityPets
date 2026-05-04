import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";
import { ServicesClient } from "@/components/ServicesClient";

export default function ServicesPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Servicios en Ushuaia</span>
        <h1>Profesionales cerca tuyo, con reputación visible</h1>
        <p>Paseadores, veterinarios y cuidadores filtrados por zona para la comunidad local.</p>
      </section>
      <ServicesClient />
    </PageTransition>
  );
}
