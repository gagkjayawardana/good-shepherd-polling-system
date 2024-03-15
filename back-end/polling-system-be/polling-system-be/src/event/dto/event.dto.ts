import { IsDateString, IsNotEmpty } from 'class-validator';

export class AddEventDto {
  @IsNotEmpty()
  @IsDateString()
  startTimet: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
