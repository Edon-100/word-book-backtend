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
import { LoginDto } from './common/dto/login.dto';
import { User } from './decorators/user.decorator';
import { AuthService } from './module/auth/auth.service';
import { JwtAuthGuard } from './module/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './module/auth/guards/local-auth.guard';
import { UserEntity } from './module/user/user.entity';
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

  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req, @User() user: UserEntity) {
    return user;
  }
}
