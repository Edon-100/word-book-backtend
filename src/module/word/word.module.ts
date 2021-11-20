import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './entities/word.entity';
import { ResponseService } from '../shared/response/response.service';

@Module({
  imports: [ResponseService, TypeOrmModule.forFeature([WordEntity])],
  controllers: [WordController],
  exports: [TypeOrmModule],
  providers: [WordService],
})
export class WordModule {}
