const Book = require("../models/books.model");
const { Success, Error } = require("../utils");

exports.addBook = async (body) => {
  try {
    const newBook = await Book(body).save();
    return Success(201, newBook);
  } catch (error) {
    return Error(500, { message: error.message });
  }
};

exports.getAllBooks = async (body) => {
  try {
    const books = await Book.find({});
    return Success(201, books);
  } catch (error) {
    return Error(500, { message: error.message });
  }
};

exports.getBookById = async (body) => {
  try {
    const book = await Book.findOne({ _id: body.id });
    return Success(201, book);
  } catch (error) {
    return Error(500, { message: error.message });
  }
};
