const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrateBodyUser, celebrateBodyAuth } = require('./validators/users');
const { createUser, login } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV } = process.env;

const config = dotenv.config({
  path: NODE_ENV === 'production' ? '.env' : '.env.common',
}).parsed;
console.log(config);

const { PORT = 3000 } = process.env;

const app = express();

const INTERNAL_SERVER_ERROR = 500;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const allowedCors = [
  'https://api.student.svetlana.nomoredomains.club',
  'https://student.svetlana.nomoredomains.club',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
});

app.set('config', config);
// app.use(cors({
//   origin: '*',
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(bodyParser.json());
app.use(requestLogger); // подключаем логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrateBodyUser, createUser);
app.post('/signin', celebrateBodyAuth, login);

app.use(auth);
app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message = statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
