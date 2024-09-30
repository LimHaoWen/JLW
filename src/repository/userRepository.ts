import { prisma } from "@prism/prisma";
import { User } from "../app/domain/entities/user";
import IUserRepository from "@/app/domain/repositories/user/IUserRepository";
import { getLogger } from "@/lib/logUtil";

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
      logger.error(`[userRepository] error creating account`); 
      throw new Error("[userRepository] error creating account");
    }
    

    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.users.findUnique({ where: { email: email }});

    if (!user) {
      logger.info(`[userRepository] email ${email} does not exist`); 
      return null;
    }

    return { 
      user_id: user.user_id, 
      username: user.username,
      email: user.email, 
      password: user.password, 
      role_type: user.role_type
    };
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.users.findUnique({ where: { username: username }});

    if (!user) {
      logger.info(`[userRepository] username ${username} does not exist`); 
      return null;
    }

    return { 
      user_id: user.user_id, 
      username: user.username,
      email: user.email, 
      password: user.password, 
      role_type: user.role_type
    };
  }
}

export const userRepository = new UserRepository();