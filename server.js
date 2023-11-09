const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const bodyParser = require("body-parser");
const booksRoutes = require("./routes/books.route");
const usersRoutes = require("./routes/users.route");
const app = express();

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/books", booksRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
