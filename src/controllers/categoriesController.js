const Categories = require("../models/categoriesModels");
const { errorMsg, errorName } = require("../utils");

const CategoriesController = {};

CategoriesController.create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }

    const category = new Categories({
      name,
      description,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

CategoriesController.getAll = async (req, res, next) => {
  try {
    const getCategories = await Categories.find();
    if (!getCategories || getCategories.length === 0) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORIES_NOT_FOUND,
      };
    }
    res.status(200).json(getCategories);
  } catch (error) {
    next(error);
  }
};

CategoriesController.getById = async (req, res, next) => {
  try {
    const getCategoriesId = await Categories.findById(req.params.id);
    if (!getCategoriesId) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORIES_NOT_FOUND,
      };
    }
    res.status(200).json(getCategoriesId);
  } catch (error) {
    next(error);
  }
};

CategoriesController.putById = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      throw {
        name: errorName.BAD_REQUEST,
        message: errorMsg.WRONG_INPUT,
      };
    }
    const updateCategories = await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateCategories) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORIES_NOT_FOUND,
      };
    }
    res.status(200).json(updateCategories);
  } catch (error) {
    next(error);
  }
};

CategoriesController.deleteById = async (req, res, next) => {
  try {
    const deleteCategories = await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    if (!deleteCategories) {
      throw {
        name: errorName.NOT_FOUND,
        message: errorMsg.CATEGORIES_NOT_FOUND,
      };
    }
    res.status(200).json({
      message: "Category soft-deleted successfully",
      data: deleteCategories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = CategoriesController;
