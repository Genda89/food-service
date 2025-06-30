import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseDBModule } from './mongooseDb/mongooseDb.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import FoodModule from './food/food.module';
import OrderModule from './order/order.module';
import DaysModule from './days/days.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseDBModule,
    UserModule,
    AuthModule,
    FoodModule,
    OrderModule,
    DaysModule,
  ],
})
export class AppModule {}
