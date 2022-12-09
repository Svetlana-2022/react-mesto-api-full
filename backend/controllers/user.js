const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HTTPError = require('../errors/HTTPError');
const BadRequestError = require('../errors/BedRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const CREATED = 201;
const UniqueErrorCode = 11000;

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  console.log(req.body, '---createUser');// ---???
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((document) => {
      const user = document.toObject();
      delete user.password;
      res.status(CREATED).send(user);
      console.log(user, '---doc');
    })
    .catch((err) => {
      console.log(err, '---createErr');
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.code === UniqueErrorCode) {
        next(new ConflictError('Пользователь с такой почтой уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      console.log(user, '--logUs');
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
      console.log({ token }, '---logToken');
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else {
        next(new UnauthorizedError('Невалидный пароль'));
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.updateUserMe = (req, res, next) => {
  const { name, about } = req.body;
  console.log(req.user);
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.updateUserMeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  console.log(req.user);
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};
