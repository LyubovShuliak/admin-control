import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtUpdateGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    return user;
  }
}
