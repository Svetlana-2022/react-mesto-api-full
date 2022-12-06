const HTTPError = require('./HTTPError');

class ServerError extends HTTPError {
  constructor(message) {
    super(message, 500);
  }
}

module.exports = ServerError;
