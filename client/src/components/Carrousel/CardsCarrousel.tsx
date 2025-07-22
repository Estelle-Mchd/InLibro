import { useNavigate } from "react-router";
import "./CardsCarrousel.css";

type BookThematic = {
  name: string;
  thematic: string;
};

function ThematicCard({ name, thematic }: BookThematic) {
  console.log("Carte affichée :", name);
  const navigate = useNavigate();

  const imgSrc =
    thematic === "fantasy"
      ? "/images/fantasy.png"
      : thematic === "histoire"
        ? "/images/history.png"
        : thematic === "suspense"
          ? "/images/suspense.png"
          : thematic === "romance"
            ? "/images/romance.png"
            : thematic === "autobiographie"
              ? "/images/autobiography.png"
              : thematic === "psychologie"
                ? "/images/psychology.png"
                : "/images/manga.png";

  return (
    <section className="card-carrousel">
      <p>{name}</p>
      <img
        src={imgSrc}
        alt={`image-${thematic}`}
        aria-label="illustration-thematics"
      />
      <button
        type="button"
        onClick={() => navigate(`/book-thematic/${thematic}`)}
      >
        Voir cette thématique
      </button>
    </section>
  );
}

export default ThematicCard;
