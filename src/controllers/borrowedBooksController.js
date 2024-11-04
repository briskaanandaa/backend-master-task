const BorrowedBooks = require("../models/borrowedBooksModels");
const { errorMsg, errorName } = require("../utils");

const BorrowedBooksController = {};

BorrowedBooksController.create = async (req, res, next) => {
  try {
    const { bookId, borrowerId, borrowedAt, returnAt, status } = req.body;

    if (!bookId || !borrowerId || !borrowedAt || !status) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const borrowedBooks = new BorrowedBooks({
      bookId: bookId,
      borrowerId: borrowerId,
      borrowedAt,
      returnAt,
      status,
    });

    await borrowedBooks.save();
    res.status(201).json(borrowedBooks);
  } catch (error) {
    next(error);
  }
};

BorrowedBooksController.getAll = async (req, res, next) => {
  try {
    const borrowedBooks = await BorrowedBooks.find({
      status: "Currently Borrowed",
    })
      .populate("bookId")
      .populate("borrowerId");
    res.status(200).json(borrowedBooks);
  } catch (error) {
    next(error);
  }
};

BorrowedBooksController.returnBook = async (req, res, next) => {
  try {
    const { borrowId } = req.body;

    if (!borrowId) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const borrowedBook = await BorrowedBooks.findById(borrowId);
    if (!borrowedBook) {
      return res.status(404).json({ message: "Borrowed book not found" });
    }

    borrowedBook.status = "Available";
    borrowedBook.returnAt = new Date();
    await borrowedBook.save();

    res.status(200).json(borrowedBook);
  } catch (error) {
    next(error);
  }
};

module.exports = BorrowedBooksController;
