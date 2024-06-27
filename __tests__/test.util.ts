import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { db } from '../src/application/database';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

export class TestUtil {
  static async deleteUser() {
    await db.user.deleteMany({
      where: {
        email: 'banda@gmail.com',
      },
    });
  }

  static async createUser() {
    const password = await bcrypt.hash('banda123', 10);

    const user = await db.user.create({
      data: {
        name: 'Banda Bahari Putra',
        email: 'banda@gmail.com',
        password,
      },
    });

    // create token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return {
      ...user,
      token,
    };
  }
}
