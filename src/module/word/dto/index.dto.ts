import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateWordDto {
  @IsString()
  text: string;
}

export class UpdateWordDto extends PartialType(CreateWordDto) {}

export class WordListDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number;

  @IsString()
  @IsOptional()
  type: string;
}
