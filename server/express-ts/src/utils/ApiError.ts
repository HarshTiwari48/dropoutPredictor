export class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: any[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      if (Error.captureStackTrace) {
  Error.captureStackTrace(this, this.constructor);
}
;
    }
  }
}
