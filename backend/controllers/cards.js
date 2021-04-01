const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const Card = require('../models/card');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточки не найдены');
      }
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequest('Невалидные данные');
        }
        next(err);
      }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не найдена');
      }
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequest('Не удалось удалить карточку');
      }
      next(error);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new BadRequest('Невалидный id карточки');
      }
      res.status(200).send({ message: 'Вам понравилось!' });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new BadRequest('Невалидный id карточки');
      }
      res.status(200).send({ message: 'Больше не нравится' });
    })
    .catch(next);
};
