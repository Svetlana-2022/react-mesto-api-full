const router = require('express').Router();

const { getCard, createCard, deleteCard } = require('../controllers/card');
const { dislikeCard, likeCard } = require('../controllers/card');
const { celebrateCards, celebrateParamsCards } = require('../validators/users');

router.get('/cards', getCard);

router.post('/cards', celebrateCards, createCard);

router.delete('/cards/:cardId', celebrateParamsCards, deleteCard);

router.delete('/cards/:cardId/likes', celebrateParamsCards, dislikeCard);

router.put('/cards/:cardId/likes', celebrateParamsCards, likeCard);

module.exports = router;
