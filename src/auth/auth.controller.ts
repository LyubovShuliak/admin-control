import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { JwtSignUpGuard } from './guards/create-user.jwt-auth.guard';
import { UserAuthGuard } from 'src/auth/guards/change-password.guard';
import { JwtLoginUpGuard } from "src/auth/guards/login-auth.guard";

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtSignUpGuard)
  @Post('/signup')
  async createUser(@Request() req) {
    return await this.authService.createUser(req.user);
  }
  @UseGuards(JwtLoginUpGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
  @UseGuards(UserAuthGuard)
  @Post('/changepassword')
  async changePassword(@Request() req) {
    return await this.authService.changePassword(req.user, req.password);
  }
}
