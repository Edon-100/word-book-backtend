import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;
}

export class findUserDto {
  @IsMobilePhone()
  phone?: string;
}

export class RegisterDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;
}
