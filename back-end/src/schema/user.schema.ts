import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

export class AddressType {
  @Prop()
  country: string;

  @Prop()
  zipcode: number;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  number: number;

  @Prop()
  floor: number;

  @Prop()
  door: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  address: AddressType;
}

export const UserSchema = SchemaFactory.createForClass(User);
