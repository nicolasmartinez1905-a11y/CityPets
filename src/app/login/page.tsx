import { LoginForm } from "@/components/AuthForms";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";

export default function LoginPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Acceso</span>
        <h1>Entrá a tu comunidad pet</h1>
        <p>Usá tu cuenta local para publicar, comentar y registrar mascotas.</p>
      </section>
      <LoginForm />
    </PageTransition>
  );
}
