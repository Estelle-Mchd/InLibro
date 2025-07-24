import "./MyBooks.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import BackButton from "../../components/BackButton/BackButton";
import { useAuth } from "../../services/AuthContext";

type Book = {
  id: number;
  name: string;
  author: string;
  cover_image_url?: string;
  synopsis?: string;
  rating?: number;
  publication_date: string;
};

function MyBooks() {
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const { user } = useAuth();

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR");
  };

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3310/api/books/user/${user.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setMyBooks)
      .catch(console.error);
  }, [user]);

  const handleDelete = (bookId: number) => {
    const confirmDelete = window.confirm("Supprimer ce livre ?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3310/api/books/${bookId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec de la suppression");
        setMyBooks((prev) => prev.filter((book) => book.id !== bookId));
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la suppression.");
      });
  };

  return (
    <section className="section-my-books">
      <h1>Mes livres publiés</h1>
      <section>
        {myBooks.length === 0 ? (
          <p>Vous n'avez encore publié aucun livre.</p>
        ) : (
          <div className="table-container">
            <table className="my-books-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Auteur</th>
                  <th>Date de la publication</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{formatDate(book.publication_date)}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(book.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Link to="/publish-a-book">Publier un nouveau livre</Link>
      <BackButton />
    </section>
  );
}

export default MyBooks;
