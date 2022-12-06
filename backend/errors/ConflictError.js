const HTTPError = require('./HTTPError');

class ConflictError extends HTTPError {
  constructor(message) {
    super(message, 409);
  }
}

module.exports = ConflictError;
