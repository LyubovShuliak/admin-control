import { AuthGuard } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { OfficeWorker, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class JwtAuthBossGuard extends AuthGuard('jwt') {
  constructor(
    @InjectModel(OfficeWorker.name) private userModel: Model<UserDocument>,
  ) {
    super();
  }
  handleRequest(err: any, user: any) {
    if (err || user.role !== Role.Boss) {
      throw err || new ForbiddenException();
    }
    return user;
  }
}
