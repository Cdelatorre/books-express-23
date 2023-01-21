const User = require('../models/User.model')
const Book = require('../models/Book.model')

module.exports.register = (req, res) => {
  res.render('users/create');
}

module.exports.doRegister = (req, res) => {
  const user = req.body;

  User.create(user)
    .then((user) => {
      res.redirect(`/users/${user.id}/detail`)
    })
    .catch((err) => {
      res.render('users/create', { errors: err.errors, user: req.body })
    })
}

module.exports.detail = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .populate('bookOwned')
    .populate({
      path: 'likes',
      populate: {
        path: 'book',
        model: 'Book'
      }
    })
    .then((userFound) => {
      console.log(userFound)
      res.render('users/detail', { user: userFound })
    })
    .catch((error) => console.log(error))
}

module.exports.find = (req, res) => {
  User.find()
    .then((users) => {
      res.render('users/list', { users })
    })
    .catch((error) => console.log(error))
}

module.exports.doLike = (req, res) => {
  User.find()
    .then((users) => {
      res.render('users/list', { users })
    })
    .catch((error) => console.log(error))
}