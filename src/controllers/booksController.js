const Books = require("../models/booksModels");
const { errorMsg, errorName } = require("../utils");

const BooksController = {};

BooksController.create = async (req, res, next) => {
  try {
    const { title, image, description, stocks, authorId, categories, author } =
      req.body;

    if (
      !title ||
      !image ||
      !description ||
      !stocks ||
      !authorId ||
      !categories
    ) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const book = new Books({
      title,
      image,
      description,
      stocks,
      authorId: authorId,
      categories: categories,
      deletedAt: null,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

BooksController.upload = async (req, res, next) => {
  try {
    const { image } = req.body;

    if (!image) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const uploadBook = await Books.findByIdAndUpdate(
      req.params.id,
      { $set: { image } },
      { new: true }
    );

    if (!uploadBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json(uploadBook);
  } catch (error) {
    next(error);
  }
};

BooksController.getAll = async (req, res, next) => {
  try {
    const getBooks = await Books.find()
      .populate("authorId")
      .populate("categories");
    if (!getBooks.length) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.json(getBooks);
  } catch (error) {
    next(error);
  }
};

BooksController.getById = async (req, res, next) => {
  try {
    const getBookId = await Books.findById(req.params.id);
    if (!getBookId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.json(getBookId);
  } catch (error) {
    next(error);
  }
};

BooksController.putById = async (req, res, next) => {
  try {
    const { title, image, description, stocks, authorId, categories } =
      req.body;

    if (
      !title ||
      !image ||
      !description ||
      !stocks ||
      !authorId ||
      !categories
    ) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const updateBook = await Books.findByIdAndUpdate(
      req.params.id,
      { $set: { title, image, description, stocks, authorId, categories } },
      { new: true }
    );

    if (!updateBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }
    res.status(200).json(updateBook);
  } catch (error) {
    next(error);
  }
};

BooksController.deleteById = async (req, res, next) => {
  try {
    const deleteBook = await Books.findByIdAndUpdate(
      req.params.id,
      { deletedAt: Date.now() },
      { new: true }
    );

    if (!deleteBook) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.BOOK_NOT_FOUND,
      };
    }

    const result = { message: "Book Deleted Successfully", data: deleteBook };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = BooksController;
