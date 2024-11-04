const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    photo: { type: String },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

const authorModel = mongoose.model("Author", authorSchema);
module.exports = authorModel;
