import BackButton from "../../components/BackButton/BackButton";
import "./About.css";

function About() {
  return (
    <section className="about-page">
      <section className="first-party-about">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          📖 À propos d’InLibro
        </h1>
        <article className="mb-8">
          <p className="text-lg text-gray-700">
            <strong>InLibro</strong> est une plateforme pensée pour les
            passionnés de lecture, les curieux, et les amoureux des belles
            histoires. Que vous soyez lecteur occasionnel, bibliophile acharné,
            ou simple explorateur de récits, InLibro vous accompagne dans la
            découverte, la gestion et le partage de vos lectures.
          </p>
        </article>
      </section>
      <section className="component-about">
        <section className="left-about">
          <article className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
              🌟 Notre mission
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                📚 Découvrir de nouveaux livres selon ses goûts et ses
                thématiques préférées.
              </li>
              <li>
                ⭐ Noter ses lectures et consulter les avis des autres lecteurs.
              </li>
              <li>
                📝 Publier ses propres ouvrages et les rendre visibles à tous.
              </li>
              <li>
                📂 Constituer une pile de lecture personnelle pour ne plus
                jamais oublier un livre à lire.
              </li>
            </ul>
          </article>
          <article className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
              🤝 Une communauté de lecteurs
            </h2>
            <p className="text-gray-700">
              InLibro n’est pas qu’un simple outil de gestion de livres : c’est
              aussi une communauté bienveillante où chaque lecteur peut :
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
              <li>• Partager ses coups de cœur</li>
              <li>• Recommander des livres à ses amis</li>
              <li>• Soutenir les auteurs indépendants</li>
            </ul>
          </article>
        </section>
        <section className="right-about">
          <article className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
              🔧 En constante évolution
            </h2>
            <p className="text-gray-700">
              Créé avec passion par une équipe de développeurs et d’amoureux des
              livres, InLibro est un projet vivant, en amélioration continue. De
              nouvelles fonctionnalités arrivent régulièrement, toujours avec
              l’ambition de vous offrir la meilleure expérience de lecture
              possible.
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
              💌 Contact
            </h2>
            <p className="text-gray-700">
              Une question ? Une suggestion ? Une envie de contribuer ?<br />
              Écrivez-nous à :{" "}
              <a
                href="mailto:contact@inlibro.app"
                className="text-indigo-700 font-medium underline"
              >
                contact@inlibro.app
              </a>
            </p>
          </article>
        </section>
      </section>
      <BackButton />
    </section>
  );
}

export default About;
