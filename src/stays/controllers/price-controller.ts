import { AuthGuard } from '@nestjs/passport';
import { PriceServices } from '../services/price-services';
import { PriceEntity } from '../domain/price-entity';
import { 
  Controller,
  Get, 
  UseGuards,
  HttpException,
  HttpStatus,
  Request
} from '@nestjs/common';

@Controller('price')
@UseGuards(AuthGuard('jwt'))
export class PriceController {
  constructor(
    private readonly priceServices: PriceServices
  ) {}

  @Get('/')
  async getAllPrices(@Request() req): Promise<PriceEntity[]> {
    try {
      return await this.priceServices.getAllPrices()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

