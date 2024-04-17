import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dto/user.dto';
import AuthDto from './dto/auth.dto';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

import { EXCEPTIONS } from 'src/constants.res';

@Injectable()
export class AuthService {
  //store tokens only in memory
  private refreshTokens: RefreshToken[] = [];
  constructor(private readonly userService: UserService) {}

  async refresh(refreshString: string): Promise<string | null> {
    const refreshToken = await this.retrieveRefreshToken(refreshString);
    if (!refreshToken) {
      return null;
    }

    const user = await this.userService.findById(refreshToken.userId);
    if (!user) {
      return null;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }

  private async retrieveRefreshToken(
    refreshString: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshString, process.env.REFRESH_SECRET);

      if (typeof decoded === 'string') {
        return null;
      }
      return await this.refreshTokens.find(
        (token: RefreshToken) => token.id === decoded.id,
      );
    } catch (error) {
      return null;
    }
  }

  async login({
    email,
    password,
  }: AuthDto): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(EXCEPTIONS.NOT_FOUND_USER);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(EXCEPTIONS.UNAUTHORIZED_USER);
    }

    return this.generateRefreshAndAccessToken(user);
  }

  private async generateRefreshAndAccessToken(
    user: UserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refresObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      userId: user._id,
    });
    //add to db
    this.refreshTokens.push(refresObject);

    return {
      refreshToken: refresObject.sign(),
      accessToken: sign({ userId: user._id }, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      }),
    };
  }

  async logout(refreshString: string): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshString);

    if (refreshToken) {
      this.refreshTokens = this.refreshTokens.filter(
        (refresh: RefreshToken) => refresh.id !== refreshToken.id,
      );
    }
  }
}
