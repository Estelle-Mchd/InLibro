import type { RequestHandler } from "express";
import readingListRepository from "./readingListRepository";

const browseByUser: RequestHandler = async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    if (Number.isNaN(userId)) {
      res.status(400).json({ error: "ID utilisateur invalide" });
      return;
    }

    const list = await readingListRepository.readAllByUserId(userId);
    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add: RequestHandler = async (req, res) => {
  try {
    const userId = Number.parseInt(req.body.userId);
    const bookId = Number.parseInt(req.body.bookId);
    const addedAt = req.body.addedAt || new Date().toISOString().split("T")[0];

    if (Number.isNaN(userId) || Number.isNaN(bookId)) {
      res.status(400).json({ error: "Paramètres invalides" });
      return;
    }

    await readingListRepository.add(userId, bookId, addedAt);
    res.status(201).json({ message: "Livre ajouté à la liste de lecture" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler = async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const bookId = Number.parseInt(req.params.bookId);

    if (Number.isNaN(userId) || Number.isNaN(bookId)) {
      res.status(400).json({ error: "Paramètres invalides" });
      return;
    }

    const deleted = await readingListRepository.remove(userId, bookId);

    if (deleted) {
      res.status(200).json({ message: "Livre retiré de la liste de lecture" });
    } else {
      res.status(404).json({ error: "Aucune correspondance trouvée" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  browseByUser,
  add,
  remove,
};
