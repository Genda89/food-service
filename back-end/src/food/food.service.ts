import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from 'src/schema/food.schema';
import FoodDto from './dto/food.dto';

@Injectable()
export default class FoodService {
  constructor(
    @InjectModel(Food.name)
    private foodModel: Model<FoodDocument>,
  ) {}

  async find(cathegory?: string): Promise<FoodDto[]> {
    if (cathegory) {
      return this.foodModel.find({ cathegory });
    }
    return this.foodModel.find();
  }

  async findById(id: string): Promise<FoodDto> {
    return this.foodModel.findById(id);
  }

  async create(newFood: FoodDto): Promise<FoodDto> {
    const addedFood = new this.foodModel(newFood);
    return addedFood.save();
  }

  async update(id: string, editedFood: FoodDto): Promise<FoodDto> {
    return this.foodModel.findByIdAndUpdate(id, editedFood);
  }

  async delete(id: string): Promise<FoodDto> {
    return this.foodModel.findByIdAndDelete(id);
  }
}
