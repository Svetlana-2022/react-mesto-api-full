// const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrateBodyUser, celebrateBodyAuth } = require('./validators/users');
const { createUser, login } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

console.log(process.env.NODE_ENV);

const { PORT } = process.env;

const app = express();

const INTERNAL_SERVER_ERROR = 500;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// cors
// const allowedCors = [
//   'https://api.student.svetlana.nomoredomains.club',
//   'https://student.svetlana.nomoredomains.club',
//   'localhost:3000',
// ];

// app.use(function(req, res, next) {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
// //Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

//   // сохраняем список заголовков исходного запроса
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }

//   next();
// });
// cors

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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
