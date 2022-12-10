const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
console.log(JWT_SECRET, '---secret');
console.log(NODE_ENV, '---env');

const Unauthorizet = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorizet('Необходима авторизация.'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    console.log(token, '---tok');
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new Unauthorizet('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};

// const = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
