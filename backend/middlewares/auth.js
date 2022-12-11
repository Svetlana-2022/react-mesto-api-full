const jwt = require('jsonwebtoken');

const Unauthorizet = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorizet('Необходима авторизация.'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    console.log(token, '---tok');
    const { JWT_SECRET } = req.app.get('config');
    console.log(JWT_SECRET, '---secret');
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new Unauthorizet('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};
