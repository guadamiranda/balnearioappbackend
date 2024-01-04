import { DiscountServices } from '../services/discount-services';
import { DiscountEntity } from '../domain/discount-entity';
import { AuthGuard } from '@nestjs/passport'
import { 
    Controller,
    Get, 
    UseGuards,
    HttpException,
    HttpStatus,
    Request,
    Put,
    Param,
    Body,
    Delete,
    Post
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

  @Post('/')
  async createDiscount(@Body() body): Promise<DiscountEntity> {
    try {
      return await this.discountServices.createDiscount(body.percentage, body.name)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @Put('/:id')
  async updateDiscount(@Param('id') id: string, @Body() body): Promise<DiscountEntity> {
    try {
      return await this.discountServices.updateDiscount(id, body.percentage, body.name)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete('/:id')
  async deleteDiscount(@Param('id') id: string): Promise<any> {
    try {
      return await this.discountServices.deleteDiscount(id)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

