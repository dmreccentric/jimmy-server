const { StatusCodes, BAD_REQUEST } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
