const Authors = require("../models/authorModels");
const { errorMsg, errorName } = require("../utils");
const mongoose = require("mongoose");

const AuthorController = {};

AuthorController.create = async (req, res, next) => {
  try {
    const { name, bio, photo } = req.body;
    if (!name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const author = new Authors({
      name,
      bio,
      photo,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deletedAt: null,
    });

    await author.save();
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

AuthorController.upload = async (req, res, next) => {
  try {
    const { id, photo } = req.body;
    if (!id || !photo) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const updatedAuthor = await Authors.findByIdAndUpdate(
      id,
      { $set: { photo, updatedAt: Date.now() } },
      { new: true }
    );

    if (!updatedAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    next(error);
  }
};

AuthorController.getAll = async (req, res, next) => {
  try {
    const authors = await Authors.find();
    if (!authors.length) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

AuthorController.getById = async (req, res, next) => {
  try {
    const author = await Authors.findById(req.params.id);
    if (!author) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

AuthorController.putById = async (req, res, next) => {
  try {
    const { name, bio, photo } = req.body;
    const authorId = req.params.id.trim();

    if (!mongoose.isValidObjectId(authorId)) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.INVALID_ID,
      };
    }

    if (!name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const updatedAuthor = await Authors.findByIdAndUpdate(
      authorId,
      { $set: { name, bio, photo, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    next(error);
  }
};
AuthorController.deleteById = async (req, res, next) => {
  try {
    const deletedAuthor = await Authors.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.AUTHOR_NOT_FOUND,
      };
    }
    const result = {
      message: "Author Deletes Successfully",
      data: deletedAuthor,
    };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorController;
