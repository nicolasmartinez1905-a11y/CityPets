type RatingStarsProps = {
  rating: number;
};

export function RatingStars({ rating }: RatingStarsProps) {
  const rounded = Math.round(rating);

  return (
    <span className="stars" aria-label={`Calificacion ${rating} de 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rounded ? "star filled" : "star"}>
          *
        </span>
      ))}
      <strong>{rating.toFixed(1)}</strong>
    </span>
  );
}
