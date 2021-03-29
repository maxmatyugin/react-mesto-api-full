const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.use(auth);

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
