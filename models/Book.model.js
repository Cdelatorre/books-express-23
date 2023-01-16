const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title name is required for a student"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "title name is required for a student"],
  },
  edition: {
    type: Number,
  }
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book