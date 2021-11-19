import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './module/word/word.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { UserEntity } from './module/user/user.entity';
import { NestLogsModule } from 'nest-logs';
import { ApiLoggingInterceptor } from './interceptors/apiLogger.interceptor';
import { SharedModule } from './module/shared/shared.module';
import { AuthModule } from './module/auth/auth.module';
import { WordEntity } from './module/word/entities/word.entity';

console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    ConfigModule.forRoot(),
    NestLogsModule,
    WordModule,
    UserModule,
    SharedModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, WordEntity],
      // logging: ['query'],
      synchronize: true, // TODO: shouldn't be used in production
    }),
  ],
  exports: [AppService],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ApiLoggingInterceptor },
  ],
})
export class AppModule {}
