import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

const readAll = async () => {
  const [rows] = await databaseClient.query<Rows>(
    `SELECT 
       b.*, 
       ROUND(AVG(r.rating)) AS averageRating 
     FROM book AS b
     LEFT JOIN rating AS r ON b.id = r.book_id
     GROUP BY b.id
     ORDER BY b.name`,
  );
  return rows;
};

const readById = async (id: number) => {
  const [[row]] = await databaseClient.query<Rows>(
    `SELECT 
       b.*, 
       ROUND(AVG(r.rating)) AS averageRating 
     FROM book AS b
     LEFT JOIN rating AS r ON b.id = r.book_id
     WHERE b.id = ?
     GROUP BY b.id`,
    [id],
  );
  return row;
};

const create = async (book: {
  name: string;
  author: string;
  publicationbookdate: string;
  thematic: string;
  synopsis: string;
  publication_date: string;
  cover_image_url: string;
  user_id: number;
}) => {
  const [result] = await databaseClient.query<Result>(
    `INSERT INTO book (name, author, publicationbookdate, thematic, synopsis, publication_date, cover_image_url, user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      book.name,
      book.author,
      book.publicationbookdate,
      book.thematic,
      book.synopsis,
      book.publication_date,
      book.cover_image_url,
      book.user_id,
    ],
  );
  return result;
};

const findAllThematics = async (): Promise<string[]> => {
  const [rows] = await databaseClient.query(
    "SELECT DISTINCT thematic FROM book",
  );
  return (rows as { thematic: string }[]).map((row) => row.thematic);
};

const update = async (
  id: number,
  updates: Partial<Omit<(typeof create.arguments)[0], "user_id">>,
) => {
  const [result] = await databaseClient.query<Result>(
    "UPDATE book SET ? WHERE id = ?",
    [updates, id],
  );
  return result;
};

const remove = async (id: number) => {
  const [result] = await databaseClient.query<Result>(
    "DELETE FROM book WHERE id = ?",
    [id],
  );
  return result.affectedRows === 1;
};

export default { readAll, readById, create, update, remove, findAllThematics };
