import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { DayType, Week } from 'src/schema/days.schema';

export class PeakPeriod {
  @IsNotEmpty()
  @IsString()
  start: string;

  @IsNotEmpty()
  @IsString()
  end: string;

  @IsNotEmpty()
  @IsNumber()
  multiplier: number;
}

export class DayDto {
  @IsEnum(DayType)
  type: DayType;

  @IsNotEmpty()
  @IsEnum(Week)
  day: Week;

  @IsNotEmpty()
  @IsString()
  open: string;

  @IsNotEmpty()
  @IsString()
  close: string;

  @IsBoolean()
  isOpen = true;

  @IsNotEmpty()
  @Type(() => PeakPeriod)
  peakPeriods: PeakPeriod[];

  @ValidateIf((day) => day.type === DayType.SPECIAL)
  @IsDate()
  date: Date;
}
