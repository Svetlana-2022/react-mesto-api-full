const HTTPError = require('./HTTPError');

class BadRequestError extends HTTPError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
