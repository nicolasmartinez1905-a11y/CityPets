"use client";

import { motion } from "framer-motion";

type DashboardSummaryProps = {
  petsCount: number;
  postsCount: number;
  matchesCount: number;
  servicesCount: number;
};

export function DashboardSummary({
  petsCount,
  postsCount,
  matchesCount,
  servicesCount
}: DashboardSummaryProps) {
  const items = [
    { label: "Mascotas", value: petsCount },
    { label: "Publicaciones", value: postsCount },
    { label: "Matches", value: matchesCount },
    { label: "Servicios", value: servicesCount }
  ];

  return (
    <section className="summary-grid">
      {items.map((item, index) => (
        <motion.article
          key={item.label}
          className="summary-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: index * 0.05, ease: "easeOut" }}
          whileHover={{ y: -3 }}
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </motion.article>
      ))}
    </section>
  );
}
