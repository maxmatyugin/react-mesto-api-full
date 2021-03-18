const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: [/(https?:\/\/)(www\.)?([\w\W\d]{1,})(\.)?([a-zA-Z]{1,10})([\w\W\d]{1,})?\#?/],
  },
});

module.exports = mongoose.model('user', userSchema);
