import { useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./PublishABook.css";
import { toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";

function PublishABook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [thematic, setThematic] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [publicationBookDate, setPublicationBookDate] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch("http://localhost:3310/api/books", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          name,
          author,
          synopsis,
          cover_image_url: coverUrl,
          thematic,
          publicationbookdate: publicationBookDate,
          publication_date: publicationDate,
        }),
      });
      if (!res.ok) throw new Error("Erreur ajout livre");
      toast.success("Livre ajouté !");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="section-publish-books">
      <h2>Publication d'un nouveau livre</h2>
      <h4>
        Pour proposer de nouvelle lecture à la communauté{" "}
        <strong>InLibro</strong>
      </h4>
      <section className="component-publish-book">
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Titre"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Auteur"
          />
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            placeholder="Synopsis"
          />
          <input
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="URL couverture"
          />
          <select
            value={thematic}
            onChange={(e) => setThematic(e.target.value)}
            required
          >
            <option value="">-- Choisir une thématique --</option>
            <option value="fantasy">Fantasy</option>
            <option value="romance">Romance</option>
            <option value="suspense">Suspense</option>
            <option value="histoire">Histoire</option>
            <option value="autobiographie">Autobiographie</option>
            <option value="psychologie">Psychologie</option>
            <option value="manga">Manga</option>
          </select>
          <label htmlFor="publication-date">Date de publication du livre</label>
          <input
            type="date"
            id="publication-date"
            value={publicationBookDate}
            onChange={(e) => setPublicationBookDate(e.target.value)}
          />
          <label htmlFor="added-date">Date d'ajout sur le site</label>
          <input
            type="date"
            id="added-date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
          <button type="submit">Ajouter le livre</button>
        </form>
      </section>
      <BackButton />
    </section>
  );
}

export default PublishABook;
