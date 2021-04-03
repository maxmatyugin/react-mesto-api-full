const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const BadRequest = require('../errors/bad-request');
const ConflictError = require('../errors/conflict');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Пользователь с таким id не найден');
      }
      next(err);
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequest('Не передан емейл или пароль');
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        throw new ConflictError('Такой пользователь уже существует');
      }
      if (err) {
        throw new BadRequest('Введены невалидные данные');
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequest('Не переданы данные');
  }

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Введены некорректные данные');
      }
      if (err.name === 'ValidationError') {
        throw new BadRequest('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequest('Не переданы данные');
  }

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new BadRequest('Данные введены некорректно');
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Введены некорректные данные');
      }
      if (err.name === 'ValidationError') {
        throw new BadRequest('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest('Не передан емейл или пароль');
  }

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequest('Неверный емейл или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isPasswordEqual) => {
          if (!isPasswordEqual) {
            throw new BadRequest('Неверный емейл или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token, name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'castError') {
        throw new BadRequest('Пользователь не найден');
      }
      next(err);
    });
};
