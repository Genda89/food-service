import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/';
import DaysService from './days.service';
import { DayDto } from './dto/day.dto';

@Controller('days')
export default class DaysController {
  constructor(private daysService: DaysService) {}

  @Post('/create')
  async create(@Body() newDay: DayDto) {
    return await this.daysService.create(newDay);
  }
}
