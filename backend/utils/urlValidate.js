const { isURL } = require('validator');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validation = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new BadRequestError('Некорректно передан URL');
};
