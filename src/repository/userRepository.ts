import { prisma } from "@/lib/prisma/prisma";
import { User } from "../app/domain/entities/user";
import IUserRepository from "@/app/domain/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser(username: string, email: string, pwHashed: string): Promise<User | undefined> {
    const user = await prisma.users.create({
      data: {
        email: email,
        username: username,
        password: pwHashed
      },
    });

    if (!user) {
      return undefined;
    }
  
    return user
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.users.findUnique({ where: { email: email }});

    if (!user) {
      return undefined;
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.users.findUnique({ where: { username: username }});

    if (!user) {
      return undefined;
    }

    return user;
  }

  async updateUserPassword(email: string, newHashedPassword: string): Promise<User | undefined> {
    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) {
      return undefined;
    }

    const user = await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        password: newHashedPassword,
      }
    });

    return user;
  }

  async deleteUserByEmail(email: string): Promise<User | undefined> {
    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) {
      return undefined;
    }

    const deletedUser = await prisma.users.delete({
      where: {
        email: email,
      },
    });

    return deletedUser;
  }
}

export const userRepository = new UserRepository();