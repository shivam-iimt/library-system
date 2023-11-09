const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now() },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Book", bookSchema);
