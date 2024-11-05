const express = require("express");
const routes = express.Router();
const BooksController = require("../controllers/booksController");
const AuthorController = require("../controllers/authorController");
const BorrowerController = require("../controllers/borrowerController");
const BorrowedBooksController = require("../controllers/borrowedBooksController");
const CategoriesController = require("../controllers/categoriesController");
// kumpulkan semua routes disini per bagian ex : /author,/books dll

// routes books
routes.get("/books/", BooksController.getAll);

routes.post("/book/", BooksController.create);
routes.get("/book/:id", BooksController.getById);
routes.put("/book/:id", BooksController.putById);
routes.delete("/book/:id", BooksController.deleteById);
routes.post("/book/upload/", BooksController.upload);

// routes author
routes.get("/authors/", AuthorController.getAll);
routes.post("/author/", AuthorController.create);
routes.put("/author/:id", AuthorController.putById);
routes.get("/author/:id", AuthorController.getById);
routes.delete("/author/:id", AuthorController.deleteById);
routes.post("/author/upload/", AuthorController.upload);

// routes categories
routes.get("/categories/", CategoriesController.getAll);
routes.post("/xategory/", CategoriesController.create);
routes.get("/xategory/:id", CategoriesController.getById);
routes.put("/xategory/:id", CategoriesController.putById);
routes.delete("/xategory/:id", CategoriesController.deleteById);

// routes borrower
routes.post("/borrower/", BorrowerController.create);
routes.get("/borrowers/", BorrowerController.getAll);
routes.get("/borrower/:id", BorrowerController.getById);
routes.put("/borrower/:id", BorrowerController.putById);
routes.delete("/borrower/:id", BorrowerController.deleteById);

//  routes borrowed book
routes.post("/borrow/book/", BorrowedBooksController.create);
routes.get("/borrow/book/list/", BorrowedBooksController.getAll);
routes.post("/borrow/book/return/", BorrowedBooksController.returnBook);

module.exports = routes;
