const Like = require('../models/Like.model')
const User = require('../models/User.model')

module.exports.create = (req, res) => {
  Like.create({ user: req.params.userId, book: req.params.bookId })
    .then(like => {
      User.findByIdAndUpdate(req.params.userId, { "$push": { "likes": like.id } }, { "new": true })
        .then(user => {
          res.send(user)
        })
    })
    .catch(err => res.send(err))
}