class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture stack trace (excluding constructor call from it)
    Error.captureStackTrace(this, this.constructor);

    // Set the name property to the class name
    this.name = this.constructor.name;
  }
}

module.exports = ErrorResponse;
