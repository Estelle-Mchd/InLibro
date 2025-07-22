import "./Carrousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { useEffect, useState } from "react";
import { data } from "react-router";
import { EffectCards } from "swiper/modules";
import ThematicCard from "./CardsCarrousel";

type CarrouselProps = {
  onThematicSelect: (thematic: string | undefined) => void;
};

function Carrousel({ onThematicSelect }: CarrouselProps) {
  const [thematics, setThematics] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3310/api/books/thematics")
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors du chargement des thématiques");
        return res.json();
      })
      .then((data: string[]) => setThematics(data))
      .catch(console.error);
    console.log("Données reçues :", data);
  }, []);

  useEffect(() => {
    onThematicSelect(thematics[selectedIndex]);
  }, [selectedIndex, thematics, onThematicSelect]);

  if (thematics.length === 0) {
    return <p>Chargement des thématiques...</p>;
  }

  return (
    <section className="accueil-carrousel">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          setSelectedIndex(swiper.activeIndex);
        }}
      >
        {thematics.map((thematic) => {
          return (
            <SwiperSlide key={thematic}>
              <ThematicCard name={thematic} thematic={thematic} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Carrousel;
