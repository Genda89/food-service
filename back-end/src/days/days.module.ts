import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Days, DaysSchema } from 'src/schema/days.schema';
import DaysController from './days.controller';
import DaysService from './days.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Days.name, schema: DaysSchema }]),
  ],
  controllers: [DaysController],
  providers: [DaysService],
  exports: [DaysService],
})
export default class DaysModule {}
