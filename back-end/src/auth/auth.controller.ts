import { Controller, Post, Body, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthDto from './dto/auth.dto';
import RefreshTokenDto from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      return await this.authService.login({ email, password });
    } catch (error) {
      throw error;
    }
  }

  @Post('refresh')
  async refreshToken(
    @Body() { refreshToken }: RefreshTokenDto,
  ): Promise<string | null> {
    return await this.authService.refresh(refreshToken);
  }

  @Delete('logout')
  async logout(@Body() { refreshToken }: RefreshTokenDto): Promise<void> {
    return await this.authService.logout(refreshToken);
  }
}
