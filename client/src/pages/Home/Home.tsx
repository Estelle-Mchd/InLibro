import { Link } from "react-router";
import Carrousel from "../../components/Carrousel/Carrousel";
import "./Home.css";

function Home() {
  return (
    <section className="home-component">
      <img src="/images/Logo-InLibro.png" alt="Logo-InLibro" />
      <section className="home-articles">
        <article className="home-presentation">
          <h1>Une panne de lecture ?</h1>
          <p>
            Choisissez une thématique et découvrez votre prochain coup de coeur
            littéraire !
          </p>
          <Link to="/">InLibro, c'est quoi ?</Link>
        </article>
        <article className="carrousel-home">
          <Carrousel onThematicSelect={() => {}} />
        </article>
      </section>
    </section>
  );
}

export default Home;
