"use client";

import { useState } from "react";

const suggestions = [
  "Detecte actividad cerca de Bahia Encerrada: Luna podria encontrar companeros de paseo hoy.",
  "Hay servicios con rating mayor a 4.7 en Centro y Costanera.",
  "Toto y Kira tienen energia compatible para una caminata supervisada en Andorra.",
  "Tu feed de Ushuaia combina comunidad, cuidado y recomendaciones locales."
];

export function AIAssistant() {
  const [message, setMessage] = useState(suggestions[0]);

  return (
    <section className="assistant-panel">
      <div>
        <span className="eyebrow">Asistente CityPets Ushuaia</span>
        <h3>Insights locales</h3>
        <p>{message}</p>
      </div>
      <button
        type="button"
        className="button secondary"
        onClick={() => {
          const next = suggestions[Math.floor(Math.random() * suggestions.length)];
          setMessage(next);
        }}
      >
        Sugerir accion
      </button>
    </section>
  );
}
