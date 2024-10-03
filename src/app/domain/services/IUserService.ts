import { User } from "../entities/user";
import { CreatedUserInfoDTO } from "@/usecase/dto";

export default interface IUserService {
    createUser(username: string, email: string, password: string): Promise<CreatedUserInfoDTO>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
  }