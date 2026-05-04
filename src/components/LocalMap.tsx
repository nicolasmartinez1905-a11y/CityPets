import { MapPin } from "lucide-react";
import type { Location, Pet } from "@/data/mockData";
import type { ServiceProfile } from "@/data/platformData";

type LocalMapProps = {
  pets: Pet[];
  services: ServiceProfile[];
};

function position(location: Location) {
  const left = ((location.lng + 68.5) / 0.25) * 100;
  const top = ((-54.78 - location.lat) / 0.08) * 100;

  return {
    left: `${Math.min(88, Math.max(8, left))}%`,
    top: `${Math.min(82, Math.max(12, top))}%`
  };
}

export function LocalMap({ pets, services }: LocalMapProps) {
  return (
    <section className="local-map-card">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Mapa simple</span>
          <h2>Ushuaia pet friendly</h2>
        </div>
      </div>
      <div className="local-map">
        <span className="map-label centro">Centro</span>
        <span className="map-label bahia">Bahia Encerrada</span>
        <span className="map-label pipo">Pipo</span>
        <span className="map-label andorra">Andorra</span>
        {pets.slice(0, 5).map((pet) => (
          <span key={pet.id} className="map-pin user-pin" style={position(pet.location)} title={pet.name}>
            <MapPin size={16} /> {pet.name}
          </span>
        ))}
        {services.slice(0, 4).map((service) => (
          <span key={service.id} className="map-pin service-pin" style={position(service.location)} title={service.name}>
            <MapPin size={16} /> {service.name}
          </span>
        ))}
      </div>
    </section>
  );
}
