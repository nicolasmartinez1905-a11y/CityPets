import Link from "next/link";
import { BriefcaseBusiness, HeartHandshake, ShieldCheck, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageTransition, SlideUp } from "@/components/Motion";
import { PlanCard } from "@/components/PlanCard";
import { plans } from "@/data/platformData";

const modules = [
  {
    href: "/servicios",
    title: "Servicios",
    text: "Veterinarios, paseadores, cuidadores, adiestradores, guarderias, peluqueria y transporte.",
    icon: BriefcaseBusiness
  },
  {
    href: "/tienda",
    title: "Tienda",
    text: "Productos con publicaciones, precios, fotos, resenas y contacto con vendedores.",
    icon: ShoppingBag
  },
  {
    href: "/adopcion",
    title: "Adopcion",
    text: "Mascotas en adopcion o transito con informacion clara y criterios responsables.",
    icon: HeartHandshake
  },
  {
    href: "/bienestar",
    title: "Bienestar y transparencia",
    text: "Verificacion, validacion de servicios, reglas de cuidado y moderacion comunitaria.",
    icon: ShieldCheck
  }
];

export default function MarketplacePage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Comunidad organizada</span>
        <h1>Todo lo que tu mascota necesita, con gente de confianza cerca</h1>
        <p>Recomendaciones, productos, adopciones y cuidados pensados para la vida real en Ushuaia.</p>
      </section>

      <section className="grid four-cards">
        {modules.map((module, index) => {
          const Icon = module.icon;

          return (
            <SlideUp key={module.href} delay={index * 0.04}>
              <Link href={module.href} className="module-card">
                <Icon size={28} />
                <h2>{module.title}</h2>
                <p>{module.text}</p>
              </Link>
            </SlideUp>
          );
        })}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Opciones para crecer</span>
            <h2>Planes simples para tutores y profesionales responsables</h2>
            <p className="muted">Más visibilidad para quienes quieren participar activamente en la comunidad.</p>
          </div>
        </div>
        <div className="grid three">
          {plans.map((plan, index) => (
            <SlideUp key={plan.name} delay={index * 0.04}>
              <PlanCard plan={plan} />
            </SlideUp>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
