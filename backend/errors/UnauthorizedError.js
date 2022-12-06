const HTTPError = require('./HTTPError');

class UnauthorizedError extends HTTPError {
  constructor(message) {
    super(message, 401);
    console.log(message, '---401');
  }
}

module.exports = UnauthorizedError;
