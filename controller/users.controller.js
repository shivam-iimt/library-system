const UsersManager = require("../manager/users.manager");

exports.registerUser = (req, res) => {
  UsersManager.registerUser(req.body)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};

exports.userLogin = (req, res) => {
  UsersManager.userLogin(req.body)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};

exports.borrowBook = (req, res) => {
  UsersManager.borrowBook(req.params)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};

exports.returnBook = (req, res) => {
  UsersManager.returnBook(req.params)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};

exports.getUserBooks = (req, res) => {
  UsersManager.getUserBooks(req.params)
    .then((result) => res.status(result.code).json(result.data))
    .catch((error) => res.status(500).json(error));
};
