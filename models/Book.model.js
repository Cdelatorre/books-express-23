const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title name is required for this book"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "author name is required for this book"],
    unique: true,
  },
  edition: {
    type: Number,
  },
  image: {
    type: String,
    default: 'https://picsum.photos/200/300?random=1',
  }
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book