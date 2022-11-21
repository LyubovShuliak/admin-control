import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-boss.dto';
import { Role } from './enums/role.enum';
import { JwtAuthAdminGuard } from './guards/create-boss.jwt-auth.guard';
import { JwtAuthBossGuard } from './guards/create-user.jwt-auth.guard';

import { JwtUpdateGuard } from './guards/update-boss.jwt-auth.guard';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create-admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createAdmin(createUserDto);
  }

  @UseGuards(JwtAuthBossGuard)
  @Post('/create/:boss')
  async createUser(
    @Body() createUserDto: { userName: string; password },
    @Param() param,
  ) {
    return await this.authService.createUser({
      ...createUserDto,
      boss: param.boss,
      role: Role.User,
    });
  }
  @UseGuards(JwtUpdateGuard)
  @Patch('/update-boss')
  async changeBoss(
    @Body()
    updateBoss: UpdateDto,

    @Request() req,
  ) {
    if (req.user.userName === updateBoss.currentBoss) {
      const res = await this.authService.changeBoss(updateBoss);
      if (!res) {
        return 'Was updated before';
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthAdminGuard)
  @Post('/create-boss')
  async createBoss(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createBoss(createUserDto);
  }

  //   @UseGuards(LoginAuthGuard)
  @Post('/login')
  async login(@Body() createUserDto: any) {
    const authorized = await this.authService.login(createUserDto);
    if (authorized.error) {
      throw new HttpException(authorized.error, HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.authService.login(createUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/subordinates')
  getSubordinates(@Request() req) {
    return this.authService.getSubordinates(req.user.role, req.user.userName);
  }
}
