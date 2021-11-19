import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseService } from '../shared/response/response.service';
// import { AppModule } from 'src/app.module';

@Module({
  imports: [ResponseService, TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
