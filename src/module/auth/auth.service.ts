import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ResponseService } from '../shared/response/response.service';
import { UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private responseService: ResponseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userData: Partial<UserDto>) {
    const user = await this.userService.findValidateUser({
      account: userData.account,
    });
    if (user && user.password === userData.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const queryUser = await this.validateUser(user);
    if (queryUser) {
      const payload = { id: queryUser.id, account: queryUser.account };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      this.responseService.sendError('账号或密码错误');
    }
  }
}
