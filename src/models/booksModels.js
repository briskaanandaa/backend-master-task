const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    stocks: { type: Number },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;
