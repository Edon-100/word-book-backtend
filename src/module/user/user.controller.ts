import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { NestLogger } from 'nest-logs';
import { ResponseService } from '../shared/response/response.service';
import { UserDto, findUserDto } from './user.dto';
import { UserService } from './user.service';

@NestLogger()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/register')
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() createUser: UserDto) {
    return this.userService.register(createUser);
  }

  @Get('/find')
  async getUser(@Query() params: findUserDto) {
    const user = await this.userService.findOne(params);
    return this.responseService.sendResponse({
      data: user,
    });
  }
}
