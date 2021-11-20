import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ResponseService } from '../shared/response/response.service';
import { UserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private responseService: ResponseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userData: Partial<UserDto>) {
    const user = await this.userService.findValidateUser({
      username: userData.username,
    });
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const queryUser = await this.validateUser(user);
    if (queryUser) {
      const payload = { id: queryUser.id, username: queryUser.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      this.responseService.sendError('账号或密码错误');
    }
  }
}
