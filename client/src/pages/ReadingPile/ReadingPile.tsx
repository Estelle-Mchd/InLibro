import { useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import "./ReadingPile.css";
import BackButton from "../../components/BackButton/BackButton";

type Book = {
  id: number;
  name: string;
  author: string;
  cover_image_url: string;
  synopsis: string;
  rating: number;
};

function ReadingPile() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3310/api/reading-list/${user.id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p>Chargement de votre pile...</p>;

  const handleRemove = async (bookId: number) => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:3310/api/reading-list/${user.id}/${bookId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  return (
    <section className="reading-pile-component">
      <h1>Ma pile de lecture</h1>
      {books.length === 0 ? (
        <p>Votre pile est vide pour le moment.</p>
      ) : (
        <section className="reading-list">
          {books.map((book) => (
            <section key={book.id} className="book-card">
              <img
                src={book.cover_image_url}
                alt={`Couverture de ${book.name}`}
                className="book-cover"
              />
              <section className="book-info">
                <h2>{book.name}</h2>
                <h4>{book.author}</h4>
                <p>{book.synopsis}</p>
              </section>
              <button type="button" onClick={() => handleRemove(book.id)}>
                Retirer de la pile
              </button>
            </section>
          ))}
        </section>
      )}
      <BackButton />
    </section>
  );
}

export default ReadingPile;
