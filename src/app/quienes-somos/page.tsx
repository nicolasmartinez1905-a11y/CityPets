import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";

export default function AboutPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Quienes somos</span>
        <h1>La ciudad tambien es de ellos</h1>
        <p>Conectando mascotas y personas en tu ciudad.</p>
      </section>
      <article className="manifest-card">
        <p>
          CityPets nace de una realidad cotidiana: cada vez mas personas viven con mascotas en
          ciudades densas, pero los servicios, recomendaciones, adopciones y oportunidades siguen
          dispersos en chats, redes informales y publicaciones dificiles de verificar.
        </p>
        <p>
          Queremos construir una comunidad donde tutores, profesionales y comercios puedan
          encontrarse con transparencia. Una plataforma donde publicar no sea solo mostrar una foto,
          sino tambien generar confianza, descubrir servicios responsables y crear oportunidades
          economicas reguladas.
        </p>
        <p>
          Nuestro compromiso es claro: monetizar sin perder de vista el bienestar animal. Por eso
          CityPets combina reputacion, verificacion, normas de uso, adopcion responsable y
          moderacion comunitaria.
        </p>
        <p>
          Creemos que una ciudad mas amigable con los animales tambien es una ciudad mas humana.
        </p>
      </article>
    </PageTransition>
  );
}
