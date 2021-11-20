import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '../shared/response/response.service';
import { RegisterDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRespsitory: Repository<UserEntity>,
    private responseService: ResponseService,
  ) {}
  async register(userRegisterDto: RegisterDto) {
    const { email, username, phone, password } = userRegisterDto;
    const queryConditionList = [];
    if (username) queryConditionList.push('users.username = :username');
    if (email) queryConditionList.push('users.email = :email');
    if (phone) queryConditionList.push('users.phone = :phone');
    const queryCondition = queryConditionList.join(' OR ');

    const exsitUser = await this.usersRespsitory
      .createQueryBuilder('users')
      .andWhere(queryCondition, { username, email, phone })
      .getOne();

    if (exsitUser) {
      const {
        username: userAccount,
        phone: userPhonoe,
        email: userEmail,
      } = exsitUser;
      if (username === userAccount) {
        return this.responseService.sendError('创建失败，已经存在该账号');
      } else if (email === userEmail) {
        return this.responseService.sendError('创建失败，已经该邮件');
      } else if (phone === userPhonoe) {
        return this.responseService.sendError('创建失败，已经存在手机号');
      } else {
        return this.responseService.sendError('创建失败');
      }
    } else {
      const user = this.usersRespsitory.create(userRegisterDto);
      return this.usersRespsitory.save(user);
    }
  }

  async findOne(condition: string | object) {
    const queryBuilder = await this.usersRespsitory.createQueryBuilder('users');
    if (typeof condition === 'string') {
      queryBuilder.where(`users.phone = :${condition}`, { condition });
    } else {
      const queryConditionList = [];
      const conditionValues = {};
      Object.keys(condition).forEach((key) => {
        if (condition[key]) {
          queryConditionList.push(`users.${key} = :${key}`);
          conditionValues[key] = condition[key];
        }
      });
      const queryCondition = queryConditionList.join(' OR ');
      queryBuilder.andWhere(queryCondition, conditionValues);
    }
    const userEntity = await queryBuilder.getOne();
    return userEntity;

    // console.log(condition);
    // const user = this.usersRespsitory.findOne(condition as object);
    // return user;
  }

  async findValidateUser(condition: any) {
    return this.usersRespsitory.findOne(condition, {
      select: ['id', 'username', 'password'],
    });
  }
}
