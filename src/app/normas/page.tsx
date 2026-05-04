import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/Motion";

const sections = [
  {
    title: "Uso responsable",
    text: "Los usuarios deben publicar informacion real, respetar a otros tutores y cuidar la privacidad propia y ajena."
  },
  {
    title: "Prohibiciones",
    text: "No se permite maltrato, fraude, venta irregular, discriminacion, spam, informacion falsa ni contenido que ponga en riesgo animales."
  },
  {
    title: "Servicios",
    text: "Los perfiles profesionales deben declarar precios, ubicacion, experiencia, condiciones del servicio y documentacion cuando corresponda."
  },
  {
    title: "Marketplace",
    text: "Las publicaciones de productos deben incluir fotos reales, precio claro, estado del producto y canal de contacto responsable."
  },
  {
    title: "Proteccion animal",
    text: "CityPets puede retirar publicaciones, suspender cuentas y derivar reportes graves a organizaciones o autoridades competentes."
  },
  {
    title: "Sanciones",
    text: "El sistema contempla advertencias, perdida de visibilidad, suspension temporal, bloqueo permanente y registro visible de incidentes."
  }
];

export default function RulesPage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Condiciones y normas</span>
        <h1>Reglas claras para una comunidad confiable</h1>
        <p>La confianza no aparece sola: se disena, se modera y se protege.</p>
      </section>
      <section className="grid two">
        {sections.map((section) => (
          <article key={section.title} className="policy-card">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>
    </PageTransition>
  );
}
