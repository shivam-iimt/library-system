const Book = require("../models/books.model");
const BooksManager = require("../manager/books.manager");

exports.addBook = (req, res) => {
  console.log(req.body)
  BooksManager.addBook(req.body)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};

exports.getAllBooks = (req, res) => {
  BooksManager.getAllBooks(req.body)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};

exports.getBookById = (req, res) => {
  BooksManager.getBookById(req.params)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};
