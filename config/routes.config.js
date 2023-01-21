const express = require('express');
const router = express.Router()
const miscController = require('../controllers/misc.controller');
const booksController = require('../controllers/books.controller');
const usersController = require('../controllers/users.controller');
const likesController = require('../controllers/likes.controller');

// MISC ROUTES //

router.get('/', miscController.home)
router.get('/about', miscController.about)

// BOOKS ROUTES //

router.get('/books/create', booksController.create)
router.post('/books/create', booksController.doCreate)
router.get('/books', booksController.find)
router.get('/books/:bookId/detail', booksController.detail)
router.get('/books/:bookId/edit', booksController.edit)
router.post('/books/:bookId/edit', booksController.doEdit)
router.post('/books/:bookId/delete', booksController.doDelete)

// USER ROUTES //

router.get('/users/register', usersController.register)
router.post('/users/register', usersController.doRegister)
router.get('/users/:userId/detail', usersController.detail)
router.get('/users', usersController.find)
router.post('/users/:userId/like/:bookId', usersController.find)

// LIKE ROUTES //

router.post('/likes/:userId/:bookId', likesController.create)

module.exports = router;