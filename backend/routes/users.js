const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar, login, getProfile,
} = require('../controllers/users');

usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/:id', auth, getUserById);
usersRouter.patch('/users/me', auth, updateProfile);
usersRouter.patch('/users/me/avatar', auth, updateAvatar);
usersRouter.get('users/me', auth, getProfile);

module.exports = usersRouter;
