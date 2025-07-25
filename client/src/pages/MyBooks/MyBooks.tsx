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
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>("");
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

  const handleUpdateImage = (bookId: number) => {
    fetch(`http://localhost:3310/api/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ cover_image_url: newImageUrl }),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la mise à jour de l’image");
        // Met à jour le livre dans le state local :
        setMyBooks((prev) =>
          prev.map((book) =>
            book.id === bookId
              ? { ...book, cover_image_url: newImageUrl }
              : book,
          ),
        );
        setEditingBookId(null);
        setNewImageUrl("");
      })
      .catch((err) => {
        console.error(err);
        alert("Échec de la mise à jour de l’image.");
      });
  };

  const handleRemoveImage = (bookId: number) => {
    fetch(`http://localhost:3310/api/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ cover_image_url: null }),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la suppression de l’image");
        setMyBooks((prev) =>
          prev.map((book) =>
            book.id === bookId ? { ...book, cover_image_url: undefined } : book,
          ),
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Échec de la suppression de l’image.");
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
                  <th>Image de couverture</th>
                  <th>Gestion des images de couverture</th>
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
                      {book.cover_image_url ? (
                        <img
                          src={book.cover_image_url}
                          alt={book.name}
                          style={{
                            width: "60px",
                            height: "auto",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        "Aucune"
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(book.id)}
                      >
                        Supprimer l'image
                      </button>
                      <br />
                      {editingBookId === book.id ? (
                        <div>
                          <input
                            type="text"
                            placeholder="Nouvelle URL"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdateImage(book.id)}
                          >
                            Valider
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingBookId(null)}
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBookId(book.id);
                            setNewImageUrl(book.cover_image_url || "");
                          }}
                        >
                          Modifier l’image
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(book.id)}
                      >
                        Supprimer le livre
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
