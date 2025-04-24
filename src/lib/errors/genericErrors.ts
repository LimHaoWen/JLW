import { AppError } from "./appError";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(err?: unknown) {
    const defaultMsg = "An unexpected error occurred.";

    if (err instanceof Error) {
      super(err.message || defaultMsg, 500);
      this.stack = err.stack;
    } else {
      super(defaultMsg, 500);
    }

    this.originalError = err;
  }

  originalError?: unknown;
}
