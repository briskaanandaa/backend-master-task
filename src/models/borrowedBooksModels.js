const mongoose = require("mongoose");

const borrowedBooksSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrower",
      required: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Available", "Currently Borrowed"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const borrowedBooksModel = mongoose.model("BorrowedBook", borrowedBooksSchema);
module.exports = borrowedBooksModel;
