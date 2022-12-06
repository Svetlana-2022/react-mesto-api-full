const { Joi, Segments, celebrate } = require('celebrate');

const linkAvatar = /^https?:\/\/[www.]?[a-zA-Z0-9]+[\w\-._~:/?#[\]$&'()*+,;*]{2,}#?$/;

module.exports.celebrateBodyUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkAvatar),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.celebrateParamsUserMe = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24),
  }).required(),
});
module.exports.celebrateBodyAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.celebrateUsers = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.celebrateUserMe = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.celebrateUserMeAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(linkAvatar),
  }),
});
module.exports.celebrateCards = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkAvatar),
  }),
});
module.exports.celebrateParamsCards = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24),
  }).required(),
});
