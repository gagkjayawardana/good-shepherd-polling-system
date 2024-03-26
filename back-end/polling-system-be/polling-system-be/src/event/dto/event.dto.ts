import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export class AddEventDto {
  @IsNotEmpty()
  @IsDateString()
  startTimet: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}

export class UpdateEventDto {
  @IsNotEmpty()
  @IsEnum(['yes', 'no'])
  resultStatus: string;
}
