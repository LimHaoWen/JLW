import { User } from "../entities/user";
import { CreatedUserInfoDTO } from "@/usecase/dto";

export default interface IUserService {
    createUser(username: string, email: string, password: string): Promise<CreatedUserInfoDTO>;
    getUserByEmail(email: string): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    updateUserPassword(email: string, newHashedPassword: string): Promise<User>;
    deleteUserByEmail(email: string): Promise<User>;
  }