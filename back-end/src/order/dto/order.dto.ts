import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsEnum,
} from 'class-validator';
import { AddressType, User } from 'src/schema/user.schema';
import { AddressDto } from 'src/user/dto/user.dto';

export enum Status {
  ORDER_RECEIVED = 'ORDER_RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export interface EquationParams {
  preparationTimes: number[];
  multiplier: number;
  orderedItemsCount: number;
  travelTime: number;
}

export class OrderType {
  @IsString()
  @IsNotEmpty()
  orderedFoodId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderDto {
  @IsNotEmpty()
  user: string;

  @IsArray()
  @Type(() => OrderType)
  @IsNotEmpty()
  orderedItems: OrderType[];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status, { each: true })
  status: Status = Status.ORDER_RECEIVED;

  @Type(() => AddressDto)
  @IsNotEmpty()
  deliveryAddress: AddressDto;
}

export class OrderResponseDto {
  @IsNotEmpty()
  @Type(() => User)
  user: User;

  @IsArray()
  @IsNotEmpty()
  @Type(() => OrderType)
  orderedItems: OrderType[];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status, { each: true })
  status: Status;

  @IsNotEmpty()
  @Type(() => AddressType)
  deliveryAddress: AddressType;

  @IsNotEmpty()
  @IsNumber()
  estimatedDeliveryTime: number;
}
