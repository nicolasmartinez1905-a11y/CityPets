"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Pet } from "@/data/mockData";

type MatchCardProps = {
  pet: Pet;
};

export function MatchCard({ pet }: MatchCardProps) {
  const [status, setStatus] = useState<"idle" | "liked" | "passed">("idle");

  return (
    <motion.article
      className="card match-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <img src={pet.mainPhotoUrl} alt={pet.name} className="match-image" />
      <div className="card-body">
        <div className="card-heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed} | {pet.zone}, {pet.city}</p>
          </div>
          <span className="score">{pet.matchScore}%</span>
        </div>
        <p className="description">{pet.description}</p>
        <div className="match-actions">
          <motion.button
            type="button"
            className="button ghost"
            onClick={() => setStatus("passed")}
            whileTap={{ scale: 0.95 }}
          >
            <X size={18} /> Pasar
          </motion.button>
          <motion.button
            type="button"
            className="button"
            onClick={() => setStatus("liked")}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={18} /> Me interesa
          </motion.button>
        </div>
        {status !== "idle" ? (
          <p className="interaction-note">
            {status === "liked"
              ? "Listo: queda guardado para coordinar un encuentro."
              : "Lo dejamos para otra vuelta."}
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}
