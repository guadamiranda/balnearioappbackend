import { IGetDiscountsUseCase } from '../../../application/use-cases/get-discounts-use-case-interface';
import { IGetPricesUseCase } from '../../../application/use-cases/get-prices-use-case-interface';
import { ReserveCreateResponseDto } from '../dto/response/reserve-create-response.dto';
import { ReserveCreateRequestDto } from '../dto/request/reserve-create-request.dto';
import { RESERVE_DISCOUNT_PATH } from '../../constants/constants';
import { DiscountEntity } from '../../../domain/discount-entity';
import { PriceEntity } from '../../../domain/price-entity';
import { Controller, Post, Get, Req } from '@nestjs/common';
import { 
    RESERVE_CONTROLLER_BASE_PATH, 
    RESERVE_POST_PATH, 
    RESERVE_PRICES_PATH
} from '../../constants/constants';

@Controller(RESERVE_CONTROLLER_BASE_PATH)
export class ReservesController {
  constructor(
    private readonly getPricesUseCase: IGetPricesUseCase,
    private readonly getDiscountsUseCase: IGetDiscountsUseCase
  ) {}

  @Post(RESERVE_POST_PATH)
  //FALTA EL RESPONSE DE DEFINIR
  create(@Req() req: ReserveCreateRequestDto): ReserveCreateResponseDto {

    return 
  }

  @Get(RESERVE_PRICES_PATH)
  async getPrices(): Promise<PriceEntity[]> {
    return await this.getPricesUseCase.execute()
  }

  @Get(RESERVE_DISCOUNT_PATH)
  async getDiscounts(): Promise<DiscountEntity[]> {
    return await this.getDiscountsUseCase.execute()
  }
}
