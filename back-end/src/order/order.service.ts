import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { zip } from 'rxjs';
import DaysService from 'src/days/days.service';
import FoodService from 'src/food/food.service';
import { Order, OrderDocument } from 'src/schema/order.schema';
import { AddressType } from 'src/schema/user.schema';
import geocoder from 'src/utils/nodeGeoCoder/nodeGeoCoder';
import travelTimeClient from 'src/utils/timeTravelConfig/travelTimeClient';
import { LocationRequest, TimeFilterRequest } from 'traveltime-api';
import { EquationParams, OrderDto, OrderType } from './dto/order.dto';

@Injectable()
export default class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private readonly foodService: FoodService,
    private readonly daysService: DaysService,
    private readonly configService: ConfigService,
  ) {}
  async find(orderId?: string) {
    return orderId
      ? await this.orderModel
          .findById(orderId)
          .populate({
            path: 'orderedItems.orderedFoodId',
            model: 'Food',
            select: 'id name size cathegory price preparationTime',
          })
          .populate('user', 'id email')
      : await this.orderModel
          .find()
          .populate({
            path: 'orderedItems.orderedFoodId',
            model: 'Food',
            select: 'id name size cathegory price preparationTime',
          })
          .populate('user', 'id email');
  }

  async create(order: OrderDto) {
    const currentUtcDate = moment().utc().toISOString();

    const travelTime = await this.getTravelTime(
      order.deliveryAddress,
      currentUtcDate,
    );
    const estimatedDeliveryTime = await this.getETA(
      order.orderedItems,
      travelTime,
      currentUtcDate,
    );
    const newOrder = new this.orderModel({ ...order, estimatedDeliveryTime });

    return newOrder.save();
  }

  async delete(orderId: string): Promise<OrderDto> {
    return await this.orderModel.findByIdAndDelete(orderId);
  }

  private async getTravelTime(
    deliveryAddress: AddressType,
    currentUtcDate: string,
  ): Promise<number> {
    const { number, street, country, zipcode } = deliveryAddress;
    const { lat, lng } = await this.getCoordination({
      number,
      street,
      country,
      zipcode,
    });

    return await this.getTravelTimeByGeoCode({ lat, lng, currentUtcDate });
  }

  private async getTravelTimeByGeoCode({
    lat,
    lng,
    currentUtcDate,
  }): Promise<number> {
    const locations: LocationRequest[] = [
      { id: 'Restaurant', coords: { lat: 47.53196, lng: 21.62472 } },
      { id: 'CustomerAddress', coords: { lat, lng } },
    ];

    const requestOptions: TimeFilterRequest = {
      locations,
      departure_searches: [
        {
          id: 'common travel time request',
          travel_time: 5400,
          departure_location_id: 'Restaurant',
          arrival_location_ids: ['CustomerAddress'],
          departure_time: currentUtcDate,
          transportation: {
            type: 'driving',
          },
          properties: ['travel_time'],
        },
      ],
    };
    const travelResponse = await travelTimeClient.timeFilter(requestOptions);
    if (travelResponse?.results[0]?.unreachable.length) {
      throw new HttpException(
        'OutOfMaxDeliveryTime',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return travelResponse?.results[0]?.locations[0]?.properties[0]?.travel_time;
  }

  private async getCoordination({ number, street, country, zipcode }) {
    const address = `${street} ${number}, ${zipcode}, Hajdú-Bihar, Debrecen ${country}`;
    const geocode = await geocoder.geocode({
      zipcode,
      street,
      number,
      countryCode: 'hu',
    });
    // const geocode = await travelTimeClient.geocoding(address);
    console.log(geocode);
    if (geocode) {
      const { latitude: lat, longitude: lng } = geocode[0];

      return { lat, lng };
    }

    throw new NotFoundException();
  }

  private async getETA(
    orderedItems: OrderType[],
    travelTime: number,
    currentUtcDate: string,
  ): Promise<number> {
    const preparationTimes: any = await Promise.all(
      orderedItems.flatMap(
        async (item) => await this.getFoodPreparationTime(item.orderedFoodId),
      ),
    );

    const orderedItemsCount = orderedItems.reduce(
      (acc, next) => acc + next.quantity,
      0,
    );

    const multiplier: number = await this.getMultiplierOfTime(currentUtcDate);

    return this.calculateETA({
      preparationTimes,
      multiplier,
      orderedItemsCount,
      travelTime,
    });
  }

  private async getFoodPreparationTime(orderedFoodId: string): Promise<number> {
    const food = await this.foodService.findById(orderedFoodId);
    return food.preparationTime;
  }

  private async getDay(currentUtcDate: string) {
    let dayDetails = await this.daysService.findByDate(currentUtcDate);

    if (!dayDetails) {
      const orderDay: string = moment(currentUtcDate).format('dddd');
      dayDetails = await this.daysService.findByDay(orderDay);
    }
    return dayDetails;
  }

  private async getMultiplierOfTime(currentUtcDate: string): Promise<number> {
    const dayDetails = await this.getDay(currentUtcDate);
    const orderTimeIso = moment(currentUtcDate).format('HH:mm');
    const peakPeriod = dayDetails.peakPeriods.find((peakPeriod) => {
      return moment(orderTimeIso, 'HH:mm').isBetween(
        moment(peakPeriod.start, 'HH:mm'),
        moment(peakPeriod.end, 'HH:mm'),
      );
    });

    return peakPeriod?.multiplier ?? 1;
  }

  /* Pre order ETA= Max(Order Preparation Time*Peak Hour Multiplier) +    
    (Default Service Time Per Order*X) + (Delivery On Road Transit Time)*/
  private calculateETA({
    preparationTimes,
    multiplier,
    orderedItemsCount,
    travelTime,
  }: EquationParams) {
    return (
      Math.max(...preparationTimes) * multiplier +
      this.configService.get('DEFAULT_SERVICE_TIME_PER_ORDER') *
        orderedItemsCount +
      travelTime
    );
  }
}
