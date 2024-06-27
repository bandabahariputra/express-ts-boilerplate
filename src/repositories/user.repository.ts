import { User } from '@prisma/client';

import { db } from '../application/database';
import { CreateUserRequest, UpdateUserRequest } from '../models/user.model';

export class UserRepository {
  static async create(user: CreateUserRequest): Promise<User> {
    const newUser = await db.user.create({
      data: user,
    });

    return newUser;
  }

  static async countUserByEmail(email: string): Promise<number> {
    const count = await db.user.count({
      where: {
        email,
      },
    });

    return count;
  }

  static async getByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  static async getById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  static async update(userId: string, user: UpdateUserRequest): Promise<User> {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: user,
    });

    return updatedUser;
  }
}
