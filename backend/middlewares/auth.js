const jwt = require('jsonwebtoken');

const Unauthorizet = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorizet('Необходима авторизация.'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new Unauthorizet('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};
