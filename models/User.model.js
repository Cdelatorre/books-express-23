const mongoose = require('mongoose');
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'First name is required.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [EMAIL_PATTERN, 'Please use a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'password es requerido mijo'],
    length: [8, 'Ey 8 carácteres como mínimo']
  },
  bookOwned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Like'
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
