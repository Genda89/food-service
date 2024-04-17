import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDto } from './dto/order.dto';
import OrderService from './order.service';

@Controller('order')
export default class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.orderService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  async findById(@Param('orderId') orderId: string) {
    return await this.orderService.find(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() order: OrderDto) {
    return await this.orderService.create(order);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':orderId')
  async delete(@Param('orderId') orderId: string): Promise<void> {
    const success = await this.orderService.delete(orderId);
    if (!success) {
      throw new NotFoundException();
    }
  }
}
