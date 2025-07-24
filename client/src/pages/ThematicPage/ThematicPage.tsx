import { type ReactNode, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useParams } from "react-router";
import "./ThematicPage.css";
import { useContext } from "react";
import BackButton from "../../components/BackButton/BackButton";
import { AuthContext } from "../../services/AuthContext"; // si tu en as un

type Book = {
  cover_image_url: string | undefined;
  name: ReactNode;
  id: number;
  title: string;
  author: string;
  cover: string;
  synopsis: string;
  rating: number;
};

function ThematicPage() {
  const { thematic } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const flipBookRef = useRef<{ pageFlip: () => void } | null>(null);
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;

  useEffect(() => {
    if (!thematic) return;

    fetch(`http://localhost:3310/api/books/book-thematic/${thematic}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur fetch");
        return res.json();
      })
      .then((data) => {
        console.log("Livres reçus :", data);
        setBooks(data);
      })
      .catch((err) => console.error("Erreur fetch :", err));
  }, [thematic]);

  if (books.length === 0) {
    return <p>Chargement des livres...</p>;
  }

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

  const handleAddToReadingList = (bookId: number) => {
    fetch("http://localhost:3310/api/reading-list", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        bookId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec de l'ajout à la pile");
        return res.json();
      })
      .then(() => {
        alert("Ajouté à votre pile de lecture !");
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'ajout.");
      });
  };

  const handleRating = (bookId: number, rating: number) => {
    fetch("http://localhost:3310/api/ratings", {
      method: "POST", // ou PUT selon ta logique
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        bookId,
        rating,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la notation");
        return res.json();
      })
      .then(() => {
        // Optionnel : met à jour la note localement si tu veux un rendu immédiat
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, rating } : book,
          ),
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Impossible d'enregistrer la note.");
      });
  };

  return (
    <section className="thematic-page">
      <div className="flipbook-container">
        <HTMLFlipBook
          width={400}
          height={600}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          startPage={0}
          className="my-flipbook"
          style={{ margin: "0 auto" }}
          ref={flipBookRef}
          drawShadow={false}
          flippingTime={100}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={false}
        >
          <div className="page-cover-page">
            <h1>{thematic?.toLowerCase()}</h1>
            <p>
              Découvrez notre sélection de livres en lien avec la thématique{" "}
              {thematic}.
            </p>
            <img
              src={imgSrc}
              alt={`image-${thematic}`}
              aria-label="illustration-thematics"
            />
          </div>

          {books.map((book) => (
            <div className="page-book-page" key={book.id}>
              <h2>{book.name}</h2>
              <h4>{book.author}</h4>
              <img
                src={book.cover_image_url}
                alt={`Couverture de ${book.title}`}
                className="book-cover"
              />
              <p>{book.synopsis}</p>
              <p className="rating">
                Note :
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={star <= book.rating ? "star filled" : "star"}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRating(book.id, star);
                      }}
                      aria-label={`Note ${star} étoiles`}
                      tabIndex={0}
                    >
                      {star <= book.rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </p>
              {user && (
                <button
                  type="button"
                  className="add-to-pile-btn"
                  onClick={() => handleAddToReadingList(book.id)}
                >
                  Ajouter à ma pile de lecture
                </button>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <section className="backbutton-thematic">
        <BackButton />
      </section>
    </section>
  );
}

export default ThematicPage;
