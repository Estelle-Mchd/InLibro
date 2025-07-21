import express from "express";

const router = express.Router();

import itemActions from "./modules/item/itemActions";

router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);

import booksActions from "./modules/books/booksActions";
import ratingActions from "./modules/rating/ratingActions";
import readingListActions from "./modules/readingList/readingListActions";
import usersActions from "./modules/users/usersActions";
import auth from "./utils/auth";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/users", usersActions.browse);
router.post("/users", usersActions.add);
router.delete("/users/:id", usersActions.destroy);

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/refresh-token", auth.refreshToken);
router.post("/users", auth.hashPassword, usersActions.add);

router.get("/books", booksActions.browse);
router.get("/books/:id", booksActions.read);

router.get("/reading-list/:userId", readingListActions.browseByUser);
router.post("/reading-list", readingListActions.add);
router.delete("/reading-list/:userId/:bookId", readingListActions.remove);

router.get("/ratings/:bookId", ratingActions.browseByBook);
router.get("/ratings/average/:bookId", ratingActions.getAverage);
router.post("/ratings", ratingActions.addOrUpdate);
router.put("/ratings/:userId/:bookId", ratingActions.addOrUpdate);
router.delete("/ratings/:userId/:bookId", ratingActions.remove);

export default router;
