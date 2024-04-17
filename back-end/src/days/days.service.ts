import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Days, DaysDocument, DayType } from 'src/schema/days.schema';
import { DayDto } from './dto/day.dto';
import { Moment } from 'moment';
@Injectable()
export default class DaysService {
  constructor(
    @InjectModel(Days.name)
    private daysModel: Model<DaysDocument>,
  ) {}

  async create(newDay: DayDto) {
    if (newDay.type === DayType.NORMAL) {
      return await this.findOneAndUpdate(newDay, {
        upsert: true,
      });
    }
  }

  async findByDay(day: string) {
    return await this.daysModel.findOne({ day });
  }

  async findByDate(date: string) {
    return await this.daysModel.findOne({ date });
  }

  async findOneAndUpdate(dayDto?: DayDto, options?: any) {
    return await this.daysModel.findOneAndUpdate(
      {
        day: dayDto.day,
      },
      dayDto,
      options,
    );
  }
}
