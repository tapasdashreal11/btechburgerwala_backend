class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); //it will set the message in parent class i.e Error
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
