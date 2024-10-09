class ApiError extends Error {
  status: any;
  code: any;
  constructor({ status, code, message, stack }: any) {
    super(message || "Unexpected error!");
    this.status = status;
    this.code = code;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
