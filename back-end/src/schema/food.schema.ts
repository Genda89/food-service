import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Document & Food;

@Schema({ timestamps: true })
export class Food extends Document {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  cathegory: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  preparationTime: number;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
