const Card = require('../models/card');
const HTTPError = require('../errors/HTTPError');
const BadRequestError = require('../errors/BedRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/Forbidden');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  req.body.owner = req.user._id;
  console.log(req.body);
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.body.owner,
    likes: req.body.likes,
    createdAt: req.body.createdAt,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено');
      } else {
        card.remove()
          .then(() => res.send({ data: card }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные карточки.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      console.log(card, '---likeCard');
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) { //
        throw new NotFoundError('Передан несуществующий _id карточки.');
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки.'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};
