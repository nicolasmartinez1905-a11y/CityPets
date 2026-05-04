"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, ShieldCheck } from "lucide-react";
import { getSupabase, hasSupabaseConfig } from "@/lib/supabase";
import { SlideUp } from "./Motion";
import { RatingStars } from "./RatingStars";

type ServiceRow = {
  id: string;
  user_id: string;
  titulo: string;
  descripcion: string;
  precio: string | null;
  ciudad: string;
  zona: string | null;
  categoria: string;
  imagen_url: string | null;
  verificado: boolean;
  rating: number;
  created_at: string;
};

export function ServicesClient() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedZone, setSelectedZone] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadServices() {
    setError("");
    if (!hasSupabaseConfig()) {
      setLoading(false);
      setError("Faltan variables de Supabase. Configurá .env.local para cargar servicios reales.");
      return;
    }

    const { data, error: servicesError } = await getSupabase()
      .from("servicios")
      .select("*")
      .eq("ciudad", "Ushuaia")
      .order("created_at", { ascending: false });

    setLoading(false);
    if (servicesError) return setError(servicesError.message);
    setServices(data ?? []);
  }

  useEffect(() => {
    loadServices();
    window.addEventListener("citypets-supabase-refresh", loadServices);
    return () => window.removeEventListener("citypets-supabase-refresh", loadServices);
  }, []);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(services.map((service) => service.categoria)))],
    [services]
  );
  const zones = useMemo(
    () => ["Todas", ...Array.from(new Set(services.map((service) => service.zona).filter(Boolean) as string[]))],
    [services]
  );
  const filteredServices = services.filter((service) => {
    const categoryMatch = selectedCategory === "Todos" || service.categoria === selectedCategory;
    const zoneMatch = selectedZone === "Todas" || service.zona === selectedZone;
    return categoryMatch && zoneMatch;
  });

  if (loading) {
    return (
      <section className="grid three">
        <div className="social-card skeleton-card" />
      </section>
    );
  }

  return (
    <>
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-success">{message}</p> : null}

      <div className="category-strip">
        {categories.map((category) => (
          <button
            className={selectedCategory === category ? "active-filter" : ""}
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="category-strip">
        {zones.map((zone) => (
          <button
            className={selectedZone === zone ? "active-filter" : ""}
            key={zone}
            type="button"
            onClick={() => setSelectedZone(zone)}
          >
            {zone}
          </button>
        ))}
      </div>

      <section className="grid three">
        {!filteredServices.length ? (
          <article className="service-card">
            <h3>No hay servicios publicados para este filtro.</h3>
            <p className="muted">Los profesionales verificados pueden cargar su perfil desde el panel.</p>
          </article>
        ) : null}
        {filteredServices.map((service, index) => (
          <SlideUp key={service.id} delay={index * 0.03}>
            <article className="service-card">
              {service.imagen_url ? <img src={service.imagen_url} alt={service.titulo} loading="lazy" /> : null}
              <div className="service-card-body">
                <span className="eyebrow">{service.categoria}</span>
                <h3>{service.titulo}</h3>
                <p>{service.descripcion}</p>
                <div className="service-meta">
                  <span><MapPin size={15} /> {service.zona ?? "Ushuaia"}</span>
                  {service.verificado ? <span><ShieldCheck size={15} /> Verificado</span> : null}
                </div>
                <RatingStars rating={service.rating ?? 0} />
                <strong>{service.precio ?? "Precio a coordinar"}</strong>
                <button
                  className="button"
                  type="button"
                  onClick={() => setMessage(`Solicitud enviada a ${service.titulo}.`)}
                >
                  Contactar
                </button>
              </div>
            </article>
          </SlideUp>
        ))}
      </section>
    </>
  );
}
