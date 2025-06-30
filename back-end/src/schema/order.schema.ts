import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from 'src/order/dto/order.dto';
import { AddressType, User } from './user.schema';

export type OrderDocument = Order & Document;

class OrderedItems {
  @Prop({ type: Types.ObjectId, ref: 'Food' })
  orderedFoodId: string;

  @Prop()
  quantity: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop()
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  orderedItems: OrderedItems[];

  @Prop({ default: Status.ORDER_RECEIVED })
  status: Status;

  @Prop()
  deliveryAddress: AddressType;

  @Prop()
  estimatedDeliveryTime: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
