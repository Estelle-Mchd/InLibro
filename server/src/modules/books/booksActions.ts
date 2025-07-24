import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import booksRepository from "./booksRepository";

const browse: RequestHandler = async (_req, res) => {
  try {
    const books = await booksRepository.readAll();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }

  try {
    const book = await booksRepository.readById(id);
    if (!book) {
      res.status(404).json({ error: "Livre introuvable" });
      return;
    }
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add: RequestHandler = async (req, res) => {
  try {
    const result = await booksRepository.create(req.body);
    if (result.affectedRows === 1) {
      res
        .status(201)
        .json({ id: result.insertId, message: "Livre ajouté avec succès" });
    } else {
      res.status(500).json({ error: "Erreur lors de l'ajout du livre" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const findByUser: RequestHandler = async (req, res) => {
  const userId = Number.parseInt(req.params.userId);
  if (Number.isNaN(userId)) {
    res.status(400).json({ error: "ID utilisateur invalide" });
    return;
  }

  try {
    const books = await booksRepository.findByUser(userId);
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }

  try {
    const result = await booksRepository.update(id, req.body);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Livre modifié avec succès" });
    } else {
      res.status(404).json({ error: "Livre introuvable ou non modifié" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getAllThematics = async (req: Request, res: Response) => {
  try {
    const thematics = await booksRepository.findAllThematics();
    res.json(thematics);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors du chargement des thématiques");
  }
};

const findByThematic = async (req: Request, res: Response) => {
  try {
    const { thematic } = req.params;
    const books = await booksRepository.findByThematic(thematic);
    console.log("Livres trouvés côté backend :", books);
    res.json(books);
  } catch (err) {
    console.error(err);
    console.error("Erreur dans findByThematic :", err);
    res
      .status(500)
      .send("Erreur serveur lors de la récupération des livres par thématique");
  }
};

const destroy: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }

  try {
    const deleted = await booksRepository.remove(id);
    if (deleted) {
      res.status(200).json({ message: "Livre supprimé" });
    } else {
      res.status(404).json({ error: "Livre non trouvé" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  browse,
  read,
  add,
  edit,
  destroy,
  getAllThematics,
  findByThematic,
  findByUser,
};
