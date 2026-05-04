import { AdminPanel } from "@/components/AdminPanel";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";

export default function AdminPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Administración CityPets</span>
        <h1>Moderación y verificación</h1>
        <p>Panel local para revisar usuarios, documentación y estados de confianza.</p>
      </section>
      <AdminPanel />
    </PageTransition>
  );
}
