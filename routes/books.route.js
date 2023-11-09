const express = require("express");
const router = express.Router();
const booksController = require("../controller/books.controller");
const {authenticateUser} = require("../milddlewares");

router.post("/", authenticateUser, booksController.addBook);
router.get("/", authenticateUser, booksController.getAllBooks);
router.get("/:id", authenticateUser, booksController.getBookById);


module.exports = router;
