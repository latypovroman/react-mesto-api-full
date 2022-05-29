const cardRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');
const { urlValidate } = require('../utils/urlValidate');

cardRoutes.get('/', getCards);

cardRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(2).required().custom(urlValidate),
  }),
}), createCard);

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), putLike);

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), deleteLike);

module.exports = cardRoutes;
