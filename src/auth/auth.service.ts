import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { OfficeWorker, UserDocument } from './schemas/user.schema';
import { SALT } from 'src/auth/constants';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthorizeUserDto } from 'src/auth/dto/authorize-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(OfficeWorker.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, userName, email } = createUserDto;

    const userExists = await this.userModel.findOne({
      userName,
      email,
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hash = await bcrypt.hash(password, SALT);

    const user = {
      userName,
      password: hash,
      email,
    };
    await this.userModel.insertMany(user);
    return {
      access_token: this.jwtService.sign({
        email: createUserDto.email,
        password: hash,
      }),
    };
  }

  async validateUser({
    email,
    password,
  }: AuthorizeUserDto): Promise<CreateUserDto> {
    const user = await this.userModel.findOne(
      { email },
      { __v: false, _id: false },
    );

    if (!user) {
      throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
    }

    const isEqual = await bcrypt.compare(password, user.password);
    console.log(user);
    if (user && isEqual) {
      return user;
    } else {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: AuthorizeUserDto) {
    const res = await this.validateUser(user);

    const payload = {
      password: res.password,
      email: res.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword({ email }: AuthorizeUserDto, newPassword) {
    const hash = await bcrypt.hash(newPassword, SALT);
    const updatePassword = await this.userModel
      .findOneAndUpdate(
        {
          email,
        },
        { password: hash },
        { projection: { __v: false, _id: false } },
      )
      .lean();
    if (!updatePassword) {
      throw new HttpException('Wrong password', HttpStatus.CONFLICT);
    } else {
      return { access_token: this.jwtService.sign(updatePassword) };
    }
  }
}
