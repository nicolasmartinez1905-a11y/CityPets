import { RecoveryForm } from "@/components/AuthForms";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";

export default function RecoveryPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Cuenta</span>
        <h1>Recuperar contraseña</h1>
        <p>Flujo simulado listo para conectar con proveedor de email real.</p>
      </section>
      <RecoveryForm />
    </PageTransition>
  );
}
