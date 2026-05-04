import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="page-shell">
      <Navbar />
      <section className="page-title">
        <h1>No encontramos ese perfil.</h1>
        <p>No encontramos ese perfil en la comunidad de Ushuaia. Proba con otra mascota del feed.</p>
        <Link className="button" href="/feed">
          Volver al feed
        </Link>
      </section>
    </main>
  );
}
