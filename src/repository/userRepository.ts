import { prisma } from "@/lib/prisma/prisma";
import { User } from "../app/domain/entities/user";
import IUserRepository from "@/app/domain/repositories/IUserRepository";
import { getLogger } from "@/lib/log/logUtil";

const logger = getLogger("account");

export class UserRepository implements IUserRepository {
  async createUser(username: string, email: string, pwHashed: string): Promise<User> {
    const user = await prisma.users.create({
      data: {
        email: email,
        username: username,
        password: pwHashed
      },
    });

    if (!user) {
      logger.error(`[userRepository] error creating account.`); 
      throw new Error("[userRepository] error creating account.");
    }
  
    return user
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.users.findUnique({ where: { email: email }});

    if (!user) {
      logger.info(`[userRepository] email ${email} does not exist.`); 
      return undefined;
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.users.findUnique({ where: { username: username }});

    if (!user) {
      logger.info(`[userRepository] username ${username} does not exist.`); 
      return undefined;
    }

    return user;
  }

  async updateUserPassword(email: string, newHashedPassword: string): Promise<User | undefined> {
    const user = await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        password: newHashedPassword,
      }
    });

    if (!user) {
      logger.error(`[userRepository] user with ${email}, failed to update password.`); 
      return undefined;
    }

    return user;
  }

  async deleteUserByEmail(email: string): Promise<User | undefined> {
    const deletedUser = await prisma.users.delete({
      where: {
        email: email,
      },
    });

    if (!deletedUser) {
      logger.error(`[userRepository] user with ${email}, failed to delete account.`); 
      return undefined;
    }

    return deletedUser;
  }
}

export const userRepository = new UserRepository();