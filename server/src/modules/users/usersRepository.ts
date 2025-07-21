// import databaseClient from "../../../database/client";
import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class usersRepository {
  async create(body: User) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (email, password, role) VALUES (?, ?, ?, ?, ?)",
      [body.firstname, body.lastname, body.email, body.password, body.role],
    );

    return {
      id: result.insertId,
      affectedRows: result.affectedRows,
    };
  }

  async readByEmail(email: string) {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    return user[0];
  }

  async readAll() {
    const [rows] = await databaseClient.query("SELECT * FROM user");

    return rows;
  }

  async delete(id: string) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new usersRepository();
