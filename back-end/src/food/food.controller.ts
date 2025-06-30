import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import FoodDto from './dto/food.dto';
import FoodService from './food.service';

// @UseGuards(JwtAuthGuard)
@Controller('food')
export default class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  async find(
    @Query('cathegory') cathegory: string | undefined,
  ): Promise<FoodDto[]> {
    return this.foodService.find(cathegory);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<FoodDto> {
    return this.foodService.findById(id);
  }

  @Post()
  async create(@Body() newFood: FoodDto): Promise<FoodDto> {
    return this.foodService.create(newFood);
  }

  @Put()
  async update(
    @Param() id: string,
    @Body() editedFood: FoodDto,
  ): Promise<FoodDto> {
    return this.foodService.update(id, editedFood);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const success = await this.foodService.delete(id);
    if (!success) {
      throw new NotFoundException();
    }
  }
}
