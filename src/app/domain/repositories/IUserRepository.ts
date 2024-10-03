import { User } from "../entities/user";

export default interface IUserRepository {
    createUser(username: string, email: string, password: string): Promise<User>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
  }