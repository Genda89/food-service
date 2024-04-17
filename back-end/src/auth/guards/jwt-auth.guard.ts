import { AuthGuard } from '@nestjs/passport';
import {
  UnauthorizedException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

//endpoint to check user has valid ac token
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (info instanceof UnauthorizedException) {
      throw new UnauthorizedException('Invalid token');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
