import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class LoginAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any) {
    if (err || !user.password || !user.userName) {
      throw (
        err || new HttpException('Missing credentials', HttpStatus.UNAUTHORIZED)
      );
    }
    return user;
  }
}
