import { CheckCircle2 } from "lucide-react";
import type { Plan } from "@/data/platformData";

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article className={plan.highlighted ? "plan-card highlighted" : "plan-card"}>
      <span className="eyebrow">{plan.audience}</span>
      <h3>{plan.name}</h3>
      <strong>{plan.price}</strong>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>
            <CheckCircle2 size={17} /> {feature}
          </li>
        ))}
      </ul>
      <button type="button" className={plan.highlighted ? "button" : "button ghost"}>
        Elegir plan
      </button>
    </article>
  );
}
