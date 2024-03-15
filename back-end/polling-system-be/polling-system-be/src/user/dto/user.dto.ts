import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
