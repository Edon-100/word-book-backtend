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
    const { email, account, phone } = userRegisterDto;
    const queryConditionList = [];
    if (account) queryConditionList.push('users.account = :account');
    if (email) queryConditionList.push('users.email = :email');
    if (phone) queryConditionList.push('users.phone = :phone');
    const queryCondition = queryConditionList.join(' OR ');

    const exsitUser = await this.usersRespsitory
      .createQueryBuilder('users')
      .andWhere(queryCondition, { account, email, phone })
      .getOne();

    if (exsitUser) {
      const {
        account: userAccount,
        phone: userPhonoe,
        email: userEmail,
      } = exsitUser;
      if (account === userAccount) {
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
    // const queryBuilder = await this.usersRespsitory.createQueryBuilder('users');
    // queryBuilder.where('users.phone = :phone', { phone });
    // const userEntity = await queryBuilder.getOne();
    // if (!userEntity) {
    //   throw new HttpException('cant find user', 999);
    // }
    // return userEntity;
  }
}
