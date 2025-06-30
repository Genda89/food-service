import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto, UserResponse } from './dto/user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto): Promise<UserResponse> {
    try {
      return await this.userService.register(dto);
    } catch (error: any) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() editedUser: UserDto): Promise<UserDto> {
    const user = await this.userService.update(editedUser);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }
}
