import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  linkedinUrl: string;

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Expose()
  password: string;
}
