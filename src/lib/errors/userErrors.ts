import { AppError } from "./appError";

export class UserAlreadyExistsError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}