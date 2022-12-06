const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validator = require('validator');

const linkAvatar = /^https?:\/\/[www.]?[a-zA-Z0-9]+[\w\-._~:/?#[\]$&'()*+,;*]{2,}#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => (linkAvatar).test(value),
      message: () => 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: () => 'Неправильная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({ email, password }) {
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          const user = document.toObject();
          delete user.password;
          console.log(user);
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
