export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
}
