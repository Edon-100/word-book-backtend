import { IsString } from 'class-validator';

export class CreateWordDto {
  @IsString()
  text: string;
}
