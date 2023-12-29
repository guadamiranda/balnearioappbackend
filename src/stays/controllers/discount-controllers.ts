import { DiscountServices } from '../services/discount-services';
import { DiscountEntity } from '../domain/discount-entity';
import { AuthGuard } from '@nestjs/passport'
import { 
    Controller,
    Get, 
    UseGuards,
    HttpException,
    HttpStatus,
    Request
  } from '@nestjs/common';

@Controller('discount')
@UseGuards(AuthGuard('jwt'))
export class DiscountController {
  constructor(
    private readonly discountServices: DiscountServices
  ) {}

  @Get('/')
  async getAlldiscounts(@Request() req): Promise<DiscountEntity[]> {
    try {
      return await this.discountServices.getAllPrices()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

