import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStragety extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userData: LoginDto) {
    console.log('validateeee');
    const user = await this.authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
