import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtSignUpGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.body;

    if (!user.email || !user.userName || !user.password) {
      throw new UnauthorizedException('Credentials are incomplete');
    }

    request['user'] = user;

    return true;
  }
}
