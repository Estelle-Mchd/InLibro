import type { RequestHandler } from "express";
import ratingRepository from "./ratingRepository";

const browseByBook: RequestHandler = async (req, res) => {
  try {
    const bookId = +req.params.bookId;

    if (Number.isNaN(bookId)) {
      res.status(400).json({ error: "ID de livre invalide" });
      return;
    }

    const ratings = await ratingRepository.readAllByBookId(bookId);
    res.status(200).json(ratings);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const addOrUpdate: RequestHandler = async (req, res) => {
  try {
    const userId = +req.body.userId;
    const bookId = +req.body.bookId;
    const rating = +req.body.rating;
    const ratingDate =
      req.body.ratingDate || new Date().toISOString().split("T")[0];

    if (
      Number.isNaN(userId) ||
      Number.isNaN(bookId) ||
      Number.isNaN(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      res.status(400).json({ error: "Paramètres invalides" });
      return;
    }

    const exists = await ratingRepository.exists(userId, bookId);

    if (exists) {
      await ratingRepository.update(userId, bookId, rating, ratingDate);
      res.status(200).json({ message: "Note mise à jour avec succès" });
    } else {
      await ratingRepository.add(userId, bookId, rating, ratingDate);
      res.status(201).json({ message: "Note ajoutée avec succès" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getAverage: RequestHandler = async (req, res) => {
  try {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const average = await ratingRepository.getAverageByBookId(bookId);
    res.status(200).json({ average });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler = async (req, res) => {
  try {
    const userId = +req.params.userId;
    const bookId = +req.params.bookId;

    if (Number.isNaN(userId) || Number.isNaN(bookId)) {
      res.status(400).json({ error: "Paramètres invalides" });
      return;
    }

    const deleted = await ratingRepository.remove(userId, bookId);

    if (deleted) {
      res.status(200).json({ message: "Note supprimée avec succès" });
    } else {
      res.status(404).json({ error: "Note non trouvée" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  browseByBook,
  addOrUpdate,
  getAverage,
  remove,
};
