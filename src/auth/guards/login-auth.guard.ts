import { AuthGuard } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

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
