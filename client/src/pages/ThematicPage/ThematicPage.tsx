import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useParams } from "react-router";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number; // notation de 1 à 5 par exemple
};

function ThematicPage() {
  const { thematic } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const flipBookRef = useRef<{ pageFlip: () => void } | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/books/book-thematic/${thematic}`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, [thematic]);

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (books.length === 0) {
    return <p>Chargement des livres...</p>;
  }

  return (
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
        flippingTime={0}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        clickEventForward={false}
        useMouseEvents={false}
        swipeDistance={0}
        showPageCorners={false}
        disableFlipByClick={false}
      >
        <div className="page-cover-page">
          <h1>{thematic?.toUpperCase()}</h1>
          <p>
            Découvrez notre sélection de livres en lien avec la thématique "
            {thematic}"
          </p>
        </div>

        {books.map((book) => (
          <div className="page-book-page" key={book.id}>
            <h2>{book.title}</h2>
            <h4>{book.author}</h4>
            <img
              src={book.cover}
              alt={`Couverture de ${book.title}`}
              className="book-cover"
            />
            <p>{book.description}</p>
            <p className="rating">Note : {renderStars(book.rating)}</p>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default ThematicPage;
