/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:role/:page/:size')
  async getAllUser(
    @Param('page') page: string,
    @Param('size') size: string,
    @Param('role') role: string,
  ) {
    return this.userService.getAllUser(page, size, role);
  }
  @Get('/userId')
  async getUserById() {}
  @Post('/')
  insertUser(@Body() user: UserDto) {
    return this.userService.insertUser(user);
  }
  @Put('/')
  async updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
