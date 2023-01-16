const express = require('express');
const hbs = require('hbs');
const Book = require('./models/Book.model');
const logger = require('morgan');
require('./config/db.config');

const app = express();

app.use(logger('dev')); // logger de morgan para ver las peticiones que se hacen
app.use(express.json()); // para que el body de las peticiones se pueda leer y ver en terminal
app.use(express.urlencoded({ extended: true })); // para que el body de las peticiones se pueda leer

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('misc/home');
});

app.get('/about', (req, res) => {
  res.render('misc/about');
})

app.get('/books/create', (req, res) => {
  res.render('books/create');
})

app.post('/books/create', (req, res) => {
  Book.create(req.body)
    .then(book => {
      res.send(book)
    })
    .catch(err => res.send(err))
})

app.get('/books', (req, res) => {
  Book.find()
    .then(books => {
      res.render('books/list', { booksList: books, title: 'Books' }) // booksList es el nombre de la variable que se va a usar en el hbs que contiene los books encontrados
    })
    .catch(err => res.send(err))
})

app.get('/books/:bookId/detail', (req, res) => {
  Book.findById(req.params.bookId) // Esto es lo mismo Book.find({ _id: '63c5a449e00d1bb10e277dd8' })
    .then(book => {
      res.render('books/detail', { book })
    })
    .catch(err => res.send(err))
})

app.get('/books/:bookId/edit', (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('books/edit', { book })
    })
    .catch(err => res.send(err))
})

app.post('/books/:bookId/edit', (req, res) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body)
    .then(book => {
      res.redirect(`/books/${book.id}/detail`)
    })
    .catch(err => res.send(err))
})

app.post('/books/:bookId/delete', (req, res) => {
  Book.findByIdAndDelete(req.params.bookId)
    .then(book => {
      res.redirect('/books')
    })
    .catch(err => res.send(err))
})





app.listen(3000, () => console.log('App listening on port 3000!'));