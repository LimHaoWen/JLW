import { User } from '../app/domain/entities/user';
import { userRepository, UserRepository } from "../repository/userRepository";
import IUserService from "@/app/domain/services/user/IUserService";
import bcrypt from "bcryptjs";
import { CreatedUserInfoDTO } from './dto';


export class UserService implements IUserService{
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(username: string, email: string, password: string): Promise<CreatedUserInfoDTO> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await this.userRepository.createUser(username, email, hashedPassword)

    const newUserDTO: CreatedUserInfoDTO = {
      username: newUser.username,
      email: newUser.email,
      role_type: newUser.role_type
    }

    return newUserDTO
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (user == null) {
      return null;
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.getUserByUsername(username);

    if (user == null) {
      return null;
    }

    return user;
  }
}

export const userService = new UserService(userRepository);