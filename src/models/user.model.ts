import { User } from '@prisma/client';

export type UserResponse = {
  name: string;
  email: string;
  token?: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
  password?: string;
};

export type changePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export function toUserResponse(user: User, token?: string): UserResponse {
  return {
    name: user.name,
    email: user.email,
    token,
  };
}
