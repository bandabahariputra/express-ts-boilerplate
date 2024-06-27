import { ZodType, z } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(1).max(128),
    email: z.string().min(1).max(128),
    password: z.string().min(1).max(128),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().min(1).max(128),
    password: z.string().min(1).max(128),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(128).optional(),
  });

  static readonly CHANGE_PASSWORD: ZodType = z.object({
    oldPassword: z.string().min(1).max(128),
    newPassword: z.string().min(1).max(128),
  });
}
