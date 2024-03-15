import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class AddVoteDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(['Roses', 'Violets', 'Marguerites', 'Lilies'])
  vote: string;
}
