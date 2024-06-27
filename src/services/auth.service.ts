import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { ResponseError } from '../application/error';
import {
  CreateUserRequest,
  LoginRequest,
  UserResponse,
  toUserResponse,
} from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserValidation } from '../validations/user.validation';
import { Validation } from '../validations/validation';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1s';

export class AuthService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request,
    );

    // check used email
    const totalUserWithSameEmail = await UserRepository.countUserByEmail(
      registerRequest.email,
    );

    // throw error if email already in use
    if (totalUserWithSameEmail !== 0) {
      throw new ResponseError(400, 'Email already used');
    }

    // hash password with bcrypt
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // save user
    const user = await UserRepository.create(registerRequest);

    // create token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return toUserResponse(user, token);
  }

  static async login(request: LoginRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    // get user by email
    const user = await UserRepository.getByEmail(loginRequest.email);

    if (!user) {
      throw new ResponseError(404, 'User not found');
    }

    // check password
    const matchedPassword = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!matchedPassword) {
      throw new ResponseError(400, 'Incorrect email or password');
    }

    // create token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return toUserResponse(user, token);
  }
}
