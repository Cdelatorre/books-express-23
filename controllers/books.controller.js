const Book = require('../models/Book.model');

module.exports.create = (req, res) => {
  res.render('books/create');
}

module.exports.doCreate = (req, res) => {
  if (req.body.image === '') {
    req.body.image = Book.schema.obj.image.default
  }

  Book.create(req.body)
    .then(book => {
      res.redirect('/books')
    })
    .catch(err => res.send(err))
}

module.exports.find = (req, res) => {
  let criteria = {}

  if (req.query.edition) {
    criteria.edition = req.query.edition
  }

  if (req.query.author) {
    criteria.author = req.query.author
  }

  // en esta linea criteria si ha llegado req.query.edition es { edition: 'req.query.edition' } y si no es {}

  Book.find(criteria)
    .then(books => {
      res.render('books/list', { booksList: books, title: 'Books' }) // booksList es el nombre de la variable que se va a usar en el hbs que contiene los books encontrados
    })
    .catch(err => res.send(err))
}

module.exports.detail = (req, res) => {
  Book.findById(req.params.bookId) // Esto es lo mismo Book.find({ _id: '63c5a449e00d1bb10e277dd8' }) pero devuelve un objeto y no un array
    .then(book => {
      res.render('books/detail', { book })
    })
    .catch(err => res.send(err))
}

module.exports.edit = (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('books/edit', { book })
    })
    .catch(err => res.send(err))
}

module.exports.doEdit = (req, res) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body)
    .then(book => {
      res.redirect(`/books/${book.id}/detail`)
    })
    .catch(err => res.send(err))
}

module.exports.doDelete = (req, res) => {
  Book.findByIdAndDelete(req.params.bookId)
    .then(book => {
      res.redirect('/books')
    })
    .catch(err => res.send(err))
}