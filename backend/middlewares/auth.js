const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Вы не авторизованы');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'somesecret');
  } catch (err) {
    throw new Unauthorized('Вы не авторизованы');
  }

  req.user = payload;

  next();
};
