import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export class AddEventDto {
  @IsNotEmpty()
  @IsDateString()
  startTimet: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @IsEnum(['yes', 'no'])
  vote: string;
}

export class UpdateEventDto {
  @IsDateString()
  startTimet: Date;

  @IsDateString()
  endTime: Date;

  @IsNotEmpty()
  @IsEnum(['yes', 'no'])
  vote: string;
}
