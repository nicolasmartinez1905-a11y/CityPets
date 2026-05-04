import Link from "next/link";
import { Heart, PawPrint } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";

export default function AboutPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title about-title">
        <span className="eyebrow">Quiénes somos</span>
        <h1>Somos personas que aman a sus mascotas.</h1>
        <p>CityPets nace para reunir esas historias que pasan todos los días en Ushuaia.</p>
      </section>

      <article className="manifest-card about-story">
        <p>
          CityPets nació de algo muy simple: para muchas personas, una mascota no es “un animal de
          compañía”. Es familia. Es quien te espera, quien te obliga a salir cuando hace frío, quien
          ocupa el sillón como si pagara alquiler y quien transforma una caminata común en un recuerdo.
        </p>
        <p>
          En Ushuaia esa relación tiene algo especial. El clima cambia, la nieve sorprende, el viento
          manda y aun así salimos. Salimos con abrigo, bolsita, correa, paciencia y amor. En cada paseo
          aparecen preguntas, recomendaciones, anécdotas y vecinos que también están viviendo lo mismo.
        </p>
        <p>
          Queremos que CityPets sea ese lugar: una comunidad cercana para compartir fotos, pedir ayuda,
          encontrar otras mascotas de la zona y sentir que nuestros hijos de cuatro patas también tienen
          un espacio propio en la ciudad.
        </p>
        <p>
          No buscamos que la app se sienta fría ni perfecta. Queremos que se sienta humana. Como una
          charla entre tutores después de un paseo, como una recomendación dada con cariño, como esa
          foto que subís porque sabés que alguien más va a entender lo que significa.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/registro">
            <PawPrint size={18} /> Sumá a tu mascota
          </Link>
          <Link className="button ghost" href="/feed">
            Ver comunidad
          </Link>
        </div>
      </article>

      <section className="section">
        <div className="grid three">
          <article className="policy-card">
            <Heart size={28} />
            <h2>Cercanía</h2>
            <p>Historias reales, lenguaje simple y una comunidad pensada para acompañarse.</p>
          </article>
          <article className="policy-card">
            <PawPrint size={28} />
            <h2>Cuidado</h2>
            <p>Promovemos paseos responsables, recomendaciones honestas y bienestar animal.</p>
          </article>
          <article className="policy-card">
            <Heart size={28} />
            <h2>Pertenencia</h2>
            <p>Porque la ciudad también se construye con quienes la recorren en cuatro patas.</p>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
