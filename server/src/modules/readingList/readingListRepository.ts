import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

const readAllByUserId = async (userId: number) => {
  const [rows] = await databaseClient.query<Rows>(
    `SELECT book.*, reading_list.added_at 
     FROM reading_list 
     JOIN book ON book.id = reading_list.book_id 
     WHERE reading_list.user_id = ?`,
    [userId],
  );
  return rows;
};

const add = async (userId: number, bookId: number, addedAt: string) => {
  const [result] = await databaseClient.query(
    "INSERT INTO reading_list (user_id, book_id, added_at) VALUES (?, ?, ?)",
    [userId, bookId, addedAt],
  );
  return result;
};

const remove = async (userId: number, bookId: number) => {
  const [result] = await databaseClient.query<Result>(
    "DELETE FROM reading_list WHERE user_id = ? AND book_id = ?",
    [userId, bookId],
  );
  return result.affectedRows === 1;
};

export default {
  readAllByUserId,
  add,
  remove,
};
