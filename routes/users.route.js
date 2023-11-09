const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");
const {authenticateUser} = require("../milddlewares");

router.post("/", usersController.registerUser);
router.post("/login", usersController.userLogin);
router.post("/borrow/:bookId/:userId", authenticateUser,usersController.borrowBook);
router.post("/return/:bookId/:userId", authenticateUser,usersController.returnBook);
router.get("/:userId/books", authenticateUser, usersController.getUserBooks);


module.exports = router;
