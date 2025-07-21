import type { RowDataPacket } from "mysql2";
import databaseClient, { type Result } from "../../../database/client";

type AverageRow = {
  average: number | null;
} & RowDataPacket;

const readAllByBookId = async (bookId: number) => {
  const [rows] = await databaseClient.query(
    `SELECT user_id, rating, rating_date
     FROM rating
     WHERE book_id = ?`,
    [bookId],
  );
  return rows;
};

const exists = async (userId: number, bookId: number) => {
  const [rows] = await databaseClient.query(
    "SELECT 1 FROM rating WHERE user_id = ? AND book_id = ?",
    [userId, bookId],
  );
  return Array.isArray(rows) && rows.length > 0;
};

const add = async (
  userId: number,
  bookId: number,
  rating: number,
  ratingDate: string,
) => {
  const [result] = await databaseClient.query<Result>(
    `INSERT INTO rating (user_id, book_id, rating, rating_date)
     VALUES (?, ?, ?, ?)`,
    [userId, bookId, rating, ratingDate],
  );
  return result;
};

const update = async (
  userId: number,
  bookId: number,
  rating: number,
  ratingDate: string,
) => {
  const [result] = await databaseClient.query<Result>(
    `UPDATE rating
     SET rating = ?, rating_date = ?
     WHERE user_id = ? AND book_id = ?`,
    [rating, ratingDate, userId, bookId],
  );
  return result;
};

const remove = async (userId: number, bookId: number) => {
  const [result] = await databaseClient.query<Result>(
    "DELETE FROM rating WHERE user_id = ? AND book_id = ?",
    [userId, bookId],
  );
  return result.affectedRows === 1;
};

const getAverageByBookId = async (bookId: number): Promise<number | null> => {
  const [[row]] = await databaseClient.query<AverageRow[]>(
    `SELECT ROUND(AVG(rating)) AS average
    FROM rating
    WHERE book_id = ?`,
    [bookId],
  );

  return row?.average ?? null;
};

export default {
  readAllByBookId,
  exists,
  add,
  update,
  remove,
  getAverageByBookId,
};
