const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Вы не авторизованы' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'somesecret');
  } catch (err) {
    return res.status(401).send({ message: 'Вы не авторизованы' });
  }

  req.user = payload;

  next();
};
