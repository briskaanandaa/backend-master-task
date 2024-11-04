const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String },
    borrowCount: { type: Number, default: 0 },
    joinAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

const borrowerModel = mongoose.model("Borrower", borrowerSchema);
module.exports = borrowerModel;
