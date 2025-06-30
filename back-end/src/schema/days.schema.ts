import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DaysDocument = Document & Days;

export enum DayType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL',
}

export enum Week {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

class PeakPeriod {
  @Prop()
  start: string;

  @Prop()
  end: string;

  @Prop()
  multiplier: number;
}

@Schema({ timestamps: true })
export class Days extends Document {
  @Prop({ required: true })
  type: DayType;

  @Prop({ required: (day) => day.type === DayType.NORMAL })
  day: Week;

  @Prop({ required: true })
  open: string;

  @Prop({ required: true })
  close: string;

  @Prop({ required: true })
  peakPeriods: PeakPeriod[];

  @Prop({ required: true })
  isOpen: boolean;

  @Prop({ required: (day) => day.type === DayType.SPECIAL })
  date: string;
}

export const DaysSchema = SchemaFactory.createForClass(Days);
