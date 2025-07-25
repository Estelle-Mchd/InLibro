import express from "express";

const router = express.Router();

import itemActions from "./modules/item/itemActions";

import booksActions from "./modules/books/booksActions";
import ratingActions from "./modules/rating/ratingActions";
import readingListActions from "./modules/readingList/readingListActions";
import usersActions from "./modules/users/usersActions";
import auth from "./utils/auth";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/item", itemActions.add);

router.get("/users", usersActions.browse);
router.post("/user", usersActions.add);
router.delete("/users/:id", usersActions.destroy);

router.post("/auth/login", auth.login);
router.post("/logout", auth.logout);
router.get("/refresh-token", auth.refreshToken);
router.post("/users-add", auth.hashPassword, usersActions.add);

router.get("/books", booksActions.browse);
router.post("/books", booksActions.add);
router.get("/books/thematics", booksActions.getAllThematics);
router.get("/books/book-thematic/:thematic", booksActions.findByThematic);
router.get("/books/user/:userId", booksActions.findByUser);
router.get("/books/id/:id", booksActions.read);
router.put("/books/:id", booksActions.edit);
router.delete("/books/:id", booksActions.destroy);

router.get("/reading-list/:userId", readingListActions.browseByUser);
router.post("/reading-list", readingListActions.add);
router.delete("/reading-list/:userId/:bookId", readingListActions.remove);

router.get("/ratings/:bookId", ratingActions.browseByBook);
router.get("/ratings/average/:bookId", ratingActions.getAverage);
router.post("/ratings", ratingActions.addOrUpdate);
router.put("/ratings/:userId/:bookId", ratingActions.addOrUpdate);
router.delete("/ratings-delete/:userId/:bookId", ratingActions.remove);

export default router;
