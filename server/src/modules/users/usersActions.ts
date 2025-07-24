import { hash } from "argon2";
import type { RequestHandler } from "express";
import usersRepository from "./usersRepository";

const browse: RequestHandler = async (req, res) => {
  const result = await usersRepository.readAll();
  res.json(result);
};

const add: RequestHandler = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      res.status(400).json({ error: "Champs obligatoires manquants" });
      return;
    }
    const hashedPassword = await hash(password);

    const user = { ...req.body, password: hashedPassword };
    const result = await usersRepository.create(user);
    if (result.affectedRows === 1) {
      res
        .status(201)
        .json({ id: result.id, message: "Compte créé avec succès !" });
    } else {
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'utilisateur" });
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

const destroy: RequestHandler = async (req, res) => {
  const deleteUser = await usersRepository.delete(req.params.id);

  if (deleteUser) {
    res.status(200).json("A profile user has been successfully deleted !");
  } else {
    res.status(404).json("Impossible to delete a profile user");
  }
};

export default { browse, add, destroy };
