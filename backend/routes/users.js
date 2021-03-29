const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar, login, getProfile,
} = require('../controllers/users');

usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);

usersRouter.use(auth);

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);
usersRouter.get('users/me', getProfile);

module.exports = usersRouter;
