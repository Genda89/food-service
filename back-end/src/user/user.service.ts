import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDto, UserResponse } from 'src/user/dto/user.dto';

import { User, UserDocument } from 'src/schema/user.schema';
import { ADMIN, EXCEPTIONS } from 'src/constants.res';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async findById(id: string): Promise<UserDto | null> {
    return await this.userModel.findById(id);
  }

  async update(editedUser: UserDto): Promise<UserDto | null> {
    return await this.userModel.findByIdAndUpdate(editedUser);
  }

  async register(userDto: UserDto): Promise<UserResponse> {
    const { role, email } = userDto;
    if (role === ADMIN) {
      const isAdminAlreadyRegistered = await this.userModel.find({ role });
      if (isAdminAlreadyRegistered.length)
        throw new ConflictException(EXCEPTIONS.CONFLICT_ADMIN);
    }
    const isUserAlreadyReserved = await this.userModel.find({ email });
    if (isUserAlreadyReserved.length)
      throw new ConflictException(EXCEPTIONS.CONFLICT_USER);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDto.password, salt);

    const createdUser = new this.userModel({
      ...userDto,
      password: hash,
    });
    await createdUser.save();

    return {
      email: createdUser.email,
      id: createdUser._id,
      role: createdUser.role,
      address: createdUser.address,
    };
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find();
  }
}
