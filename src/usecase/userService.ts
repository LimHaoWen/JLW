import IUserService from "@/app/domain/services/IUserService";
import IUserRepository from "@/app/domain/repositories/IUserRepository";
import { User } from '../app/domain/entities/user';
import { userRepository } from "../repository/userRepository";
import bcrypt from "bcryptjs";
import { CreatedUserInfoDTO } from './dto';
import { InternalServerError, NotFoundError } from "@/lib/errors/genericErrors";
import { UserAlreadyExistsError } from "@/lib/errors/userErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export class UserService implements IUserService  {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(username: string, email: string, password: string): Promise<CreatedUserInfoDTO> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError(`email ${email} already exists.`);
    }

    const existingUsername = await this.userRepository.getUserByUsername(username);
    if (existingUsername) {
      throw new UserAlreadyExistsError(`username ${username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await this.userRepository.createUser(username, email, hashedPassword);

    if (!newUser) {
      throw new InternalServerError();
    }

    const newUserDTO: CreatedUserInfoDTO = {
      username: newUser.username,
      email: newUser.email,
      role_type: newUser.role_type
    }

    return newUserDTO;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError(`user with email ${email} not found.`);
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new NotFoundError(`user with username ${username} not found.`);
    }

    return user;
  }

  async updateUserPassword(email: string, newHashedPassword: string): Promise<User> {
    try {
      const user = await this.userRepository.updateUserPassword(email, newHashedPassword);
      if (!user) {
        throw new NotFoundError(`user with email ${email} not found.`);
      }

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
        throw new NotFoundError(err.message);
      }

      throw new InternalServerError(err);
    }
  }

  async deleteUserByEmail(email: string): Promise<User> {
    try {
      const deletedUser = await this.userRepository.deleteUserByEmail(email);
      if (!deletedUser) {
        throw new NotFoundError(`user with email ${email} not found.`);
      }

      return deletedUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
        throw new NotFoundError(err.message);
      }

      throw new InternalServerError(err);
    }
  }
}

export const userService = new UserService(userRepository);