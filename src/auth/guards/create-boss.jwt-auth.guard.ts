import { AuthGuard } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class JwtAuthAdminGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || user.role !== Role.Admin) {
      throw err || new ForbiddenException();
    }
    return user;
  }
}
