import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import DaysModule from 'src/days/days.module';
import FoodModule from 'src/food/food.module';
import { Order, OrderSchema } from 'src/schema/order.schema';
import OrderController from './order.controller';
import OrderService from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    FoodModule,
    DaysModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export default class OrderModule {}
