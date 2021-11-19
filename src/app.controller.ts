import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NestLogger } from 'nest-logs';
import { AppService } from './app.service';
import { AuthService } from './module/auth/auth.service';
import { JwtAuthGuard } from './module/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './module/auth/guards/local-auth.guard';
import { UserService } from './module/user/user.service';

@NestLogger()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    console.log('req.user', req.user);
    return req.user;
  }
}
