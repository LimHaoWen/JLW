import { User } from "../entities/user";

export default interface IUserRepository {
    createUser(username: string, email: string, password: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    updateUserPassword(email: string, newHashedPassword: string): Promise<User | undefined>;
    deleteUserByEmail(email: string): Promise<User | undefined>;
  }