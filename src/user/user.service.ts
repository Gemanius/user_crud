/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private Users: UserDto[];

  constructor() {
    this.Users = [];
  }
  insertUser() {}
  getAllUser() {}
  deleteUser() {}
  updateUser() {}
  getUserById() {}
}
