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
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RoleEnum } from './enum/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  checkRoleType(role: string) {
    if (
      role != RoleEnum.ADMIN &&
      role != RoleEnum.GUEST &&
      role != RoleEnum.MEMBER
    )
      throw new BadRequestException();
  }
  checkFieldsToNotBeNull(user: Partial<UserDto>) {
    const { email, name, familyName, role } = user;
    if (!email || !name || !familyName || !role)
      throw new BadRequestException();
    this.checkRoleType(role);
  }

  @Get('/:page/:size')
  getAllUser(
    @Param('page') page: number,
    @Param('size') size: number,
    @Query('role') role?: string,
  ) {
    if (!page || !size) throw new BadRequestException();
    if (role) this.checkRoleType(role);
    return this.userService.getAllUser(+page, +size, role);
  }
  @Get('/:userId')
  getUserById(@Param('userId') userId: string) {
    if (!userId) throw new BadRequestException();
    return this.userService.getUserById(userId);
  }
  @Post('/')
  insertUser(@Body() user: Omit<UserDto, 'id'>) {
    this.checkFieldsToNotBeNull(user);
    return this.userService.insertUser(user);
  }
  @Put('/')
  updateUser(@Body() user: UserDto) {
    const { createdAt, updatedAt, ...userDetails } = user;
    this.checkFieldsToNotBeNull(userDetails);
    return this.userService.updateUser(user);
  }
  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string) {
    if (!userId) throw new BadRequestException();
    return this.userService.deleteUser(userId);
  }
}
