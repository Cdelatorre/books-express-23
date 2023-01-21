const express = require('express');
const logger = require('morgan');

const router = require('./config/routes.config');
require('./config/db.config');
require('./config/hbs.config');

const app = express();

app.use(logger('dev')); // logger de morgan para ver las peticiones que se hacen
app.use(express.json()); // para que el body de las peticiones se pueda leer y ver en terminal
app.use(express.urlencoded({ extended: true })); // para que el body de las peticiones se pueda leer

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/** Configure static files */
app.use(express.static("public"));

/** Router **/
app.use('/', router)

app.listen(3000, () => console.log('App listening on port 3000!'));