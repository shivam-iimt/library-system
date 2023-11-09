const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/books.model");
const User = require("../models/users.model");
const { Success, Error } = require("../utils");

exports.registerUser = async (body) => {
  try {
    console.log(11111)
    const { username, email, password } = body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)return Error(400, { message: "Username or email is already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    }).save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);
    return Success(201, { userData: newUser, token });
  } catch (error) {
    return Error(500, { message: error.message });
  }
};

exports.userLogin = async (body) => {
  try {
    const { username, password } = body;
    const user = await User.findOne({ username });
    if (!user) return Error(404,{ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return Error(401, { message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
    return Success(201, { userData: user, token });
  } catch (error) {
    return Error(500, { message: error.message });
  }
};

exports.borrowBook = async (body) => {
  try {
    const { bookId, userId } = body;
    const book = await Book.findById(bookId);

    if (!book) return Error(404, { message: "Book not found" });
    if (!book.quantityAvailable)
      return Error(400, { message: "No available copies to borrow" });

    book.quantityAvailable -= 1;
    await book.save();

    const user = await User.findById(userId);
    user.borrowedBooks.push(bookId);
    await user.save();
    return Success(201, { message: "Book borrowed successfully" });
  } catch (error) {
    return Error(500, { message: error.message });
  }
};

exports.returnBook = async (body) => {
  try {
    const { bookId, userId } = body;
    const book = await Book.findById(bookId);

    if (!book) return Error(404, { message: "Book not found" });
    book.quantityAvailable += 1;
    await book.save();

    const user = await User.findById(userId);
    user.borrowedBooks = user.borrowedBooks.filter((b) => b.toString() !== bookId.toString());
    await user.save();
    return Success(201, { message: "Book returned successfully" });
  } catch (error) {
    return Error(500, { message: error.message });
  }
};

exports.getUserBooks = async (body) => {
  try {
    const user = await User.findById(body.userId);
    if (!user) return Error(404, { message: "User not found" });
    const userBooks = await Book.find({ _id: { $in: user.borrowedBooks } });
    return Success(201, userBooks);
  } catch (error) {
    return Error(500, { message: error.message });
  }
};