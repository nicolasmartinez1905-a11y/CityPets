import { Navbar } from "@/components/Navbar";
import { RegisterForm } from "@/components/AuthForms";
import { PageTransition } from "@/components/Motion";

export default function RegisterPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Alta local</span>
        <h1>Sumate a CityPets Ushuaia</h1>
        <p>Creá tu cuenta, confirmá tu email y empezá a conectar con tutores de tu zona.</p>
      </section>
      <RegisterForm />
    </PageTransition>
  );
}
