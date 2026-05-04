"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import type { ServiceProfile } from "@/data/platformData";
import { RatingStars } from "./RatingStars";

type ServiceCardProps = {
  service: ServiceProfile;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [contacted, setContacted] = useState(false);

  return (
    <article className="card marketplace-card">
      <img src={service.imageUrl} alt={service.name} className="card-image" loading="lazy" />
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{service.name}</h3>
            <p>{service.category} | {service.zone}, {service.city}</p>
          </div>
          <span className="pill">{service.price}</span>
        </div>
        <p className="description">{service.description}</p>
        <div className="card-footer">
          <RatingStars rating={service.rating || 5} />
          <span>{service.reviews} reseñas</span>
        </div>
        <div className="trust-row">
          <span><ShieldCheck size={16} /> {service.verified ? "Verificado" : "Pendiente"}</span>
          <strong>Confianza {service.trustLevel}</strong>
        </div>
        <button type="button" className="button" onClick={() => setContacted(true)}>Contactar</button>
        {contacted ? <p className="form-success">Solicitud enviada. El prestador recibirá tu contacto.</p> : null}
      </div>
    </article>
  );
}
