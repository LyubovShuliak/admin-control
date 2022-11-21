import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { OfficeWorker, UserDocument } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { Role } from './enums/role.enum';
import { UpdateDto } from './dto/update-boss.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(OfficeWorker.name) private userModel: Model<UserDocument>,
  ) {}
  async getUserAndInsert(user: CreateUserDto) {
    const { password, userName, boss } = user;

    const doesBossSignUp = await this.userModel.findOne({
      userName: boss,
    });
    if (!doesBossSignUp) {
      return {
        error: 'Boss not exist',
      };
    }

    const doesUserAlreadySignUp = await this.userModel.findOne({
      userName: userName,
    });

    if (doesUserAlreadySignUp) {
      return {
        error: 'User already exist',
      };
    }

    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    await this.userModel.insertMany([
      {
        ...user,
        password: hash,
      },
    ]);
    await this.userModel.updateOne(
      { userName: boss },
      { $push: { subordinators: userName } },
    );
    return user;
  }

  async createAdmin(createUserDto: any) {
    const { password, userName } = createUserDto;

    const doesAdminExist = await this.userModel.findOne({
      userName: userName,
    });

    if (doesAdminExist) {
      return {
        error: 'Admin already exist',
      };
    }

    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    const admin = {
      userName: createUserDto.userName,
      role: Role.Admin,
      boss: Role.Admin,
      password: hash,
    };

    await this.userModel.insertMany([admin]);

    return {
      access_token: this.jwtService.sign({
        userName: createUserDto.userName,
        role: Role.Admin,
        boss: Role.Admin,
      }),
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.getUserAndInsert(createUserDto);
  }
  async createBoss(createUserDto: CreateUserDto) {
    return await this.getUserAndInsert(createUserDto);
  }

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ userName: userName });

    if (!user) {
      return { error: 'Not found' };
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (user && isEqual) {
      return user;
    }
    return null;
  }

  async login(user: AuthorizeUserDto) {
    const res = await this.validateUser(user.userName, user.password);
    if (res.error) {
      return res;
    }
    if (res) {
      const payload = {
        userName: res.userName,
        role: res.role,
        boss: res.boss,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return { error: 'Wrong credetials' };
    }
  }

  async changeBoss(update: UpdateDto) {
    return await this.userModel.findOneAndUpdate(
      { userName: update.userName },
      { boss: update.newBoss },
    );
  }

  async getSubordinates(role, userName) {
    const subs = await this.userModel.findOne({ userName: userName }).lean();

    return { [role]: userName, subs: subs ? subs.subordinators : [] };
  }
}
