import * as bcrypt from 'bcrypt';

import { ResponseError } from '../application/error';
import {
  UpdateUserRequest,
  UserResponse,
  changePasswordRequest,
  toUserResponse,
} from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserValidation } from '../validations/user.validation';
import { Validation } from '../validations/validation';

export class UserService {
  static async getById(userId: string): Promise<UserResponse> {
    const user = await UserRepository.getById(userId);

    if (!user) {
      throw new ResponseError(404, 'User not found');
    }

    return toUserResponse(user);
  }

  static async update(
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    const findUser = await UserRepository.getById(userId);

    if (!findUser) {
      throw new ResponseError(404, 'User not found');
    }

    const updatedUser = await UserRepository.update(findUser.id, updateRequest);

    return toUserResponse(updatedUser);
  }

  static async changePassword(
    userId: string,
    request: changePasswordRequest,
  ): Promise<UserResponse> {
    const changePasswordRequest = Validation.validate(
      UserValidation.CHANGE_PASSWORD,
      request,
    );

    const findUser = await UserRepository.getById(userId);

    if (!findUser) {
      throw new ResponseError(404, 'User not found');
    }

    // check password
    const matchedPassword = await bcrypt.compare(
      changePasswordRequest.oldPassword,
      findUser.password,
    );

    if (!matchedPassword) {
      throw new ResponseError(400, 'Old password not matched');
    }

    changePasswordRequest.newPassword = await bcrypt.hash(
      changePasswordRequest.newPassword,
      10,
    );

    const updatedUser = await UserRepository.update(findUser.id, {
      password: changePasswordRequest.newPassword,
    });

    return toUserResponse(updatedUser);
  }
}
