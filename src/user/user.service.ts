/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private Users: UserDto[];

  constructor() {
    this.Users = [];
  }
  emailUniqueConstraint(email: string) {
    const isReaptedEmail = this.Users.find((elem) => elem.email == email);
    if (isReaptedEmail) throw new BadRequestException();
  }
  insertUser(user: Omit<UserDto, 'id'>) {
    this.emailUniqueConstraint(user.email);
    const id = `user_${new Date().getTime()}`;
    const createdAt = new Date();
    const updatedAt = new Date();
    const newUser = { id, ...user, createdAt, updatedAt };
    this.Users.push(newUser);
    return newUser;
  }
  getAllUser(page: number, size: number, role?: string) {
    let result: UserDto[] = !role
      ? this.Users
      : this.Users.filter((elem) => elem.role == role);
    result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const from = (page - 1) * size;
    return {
      data: result.slice(from, from + size),
      count: result.length,
    };
  }
  deleteUser(userId: string) {
    const user = this.getUserById(userId);
    if (!user) throw new NotFoundException();
    this.Users = this.Users.filter((elem) => elem.id != userId);
    return 'deleted';
  }
  updateUser(user: UserDto) {
    const existedUserDetails = this.getUserById(user.id);
    if (!existedUserDetails) throw new NotFoundException();
    if (existedUserDetails.email !== user.email)
      this.emailUniqueConstraint(user.email);
    this.Users = [
      ...this.Users.filter((elem) => elem.id != user.id),
      {
        ...existedUserDetails,
        ...user,
        updatedAt: new Date(),
      },
    ];
    return user;
  }
  getUserById(userId: string) {
    const user = this.Users.find((elem) => elem.id == userId);
    if (!user) throw new NotFoundException();
    return user;
  }
}
