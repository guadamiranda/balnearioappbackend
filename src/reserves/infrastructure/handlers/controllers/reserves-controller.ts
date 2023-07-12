import { ICreateDiscountUseCase } from 'src/reserves/application/use-cases/create-discount-use-case-interface';
import { IGetDiscountsUseCase } from '../../../application/use-cases/get-discounts-use-case-interface';
import { CreateDiscountCommand } from '../../../application/use-cases/command/create-discount-command';
import { ReserveCreateDiscountBodyDto } from '../dto/request/reserve-create-discount-request.dto';
import { IGetPricesUseCase } from '../../../application/use-cases/get-prices-use-case-interface';
import { CreatePriceCommand } from '../../../application/use-cases/command/create-price-command';
import { ReserveCreatePriceBodyDto } from '../dto/request/reserve-create-price-request.dto';
import { ReserveCreateResponseDto } from '../dto/response/reserve-create-response.dto';
import { ReserveCreateRequestDto } from '../dto/request/reserve-create-request.dto';
import { RESERVE_DISCOUNT_PATH } from '../../constants/constants';
import { DiscountEntity } from '../../../domain/discount-entity';
import { PriceEntity } from '../../../domain/price-entity';
import { 
    RESERVE_CONTROLLER_BASE_PATH, 
    RESERVE_POST_PATH, 
    RESERVE_PRICES_PATH
} from '../../constants/constants';
import { 
  Controller, 
  Post, 
  Get, 
  Req, 
  Headers, 
  Body 
} from '@nestjs/common';
import { ICreatePriceUseCase } from 'src/reserves/application/use-cases/create-price-use-case-interface';


@Controller(RESERVE_CONTROLLER_BASE_PATH)
export class ReservesController {
  constructor(
    private readonly createDiscountUseCase: ICreateDiscountUseCase,
    private readonly getDiscountsUseCase: IGetDiscountsUseCase,
    private readonly createPriceUseCase: ICreatePriceUseCase,
    private readonly getPricesUseCase: IGetPricesUseCase,
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

  @Post(RESERVE_PRICES_PATH)
  async createPrice(@Headers() headers: any, @Body() body: ReserveCreatePriceBodyDto): Promise<PriceEntity> {
    const createDiscountCommand = new CreatePriceCommand(
      body.name, body.amount
    )
    
    return await this.createPriceUseCase.execute(createDiscountCommand)
  }

  @Get(RESERVE_DISCOUNT_PATH)
  async getDiscounts(): Promise<DiscountEntity[]> {
    return await this.getDiscountsUseCase.execute()
  }

  @Post(RESERVE_DISCOUNT_PATH)
  async createDiscount(@Headers() headers: any, @Body() body: ReserveCreateDiscountBodyDto): Promise<DiscountEntity> {
    const createDiscountCommand = new CreateDiscountCommand(
      body.name, body.percentage
    )

    return await this.createDiscountUseCase.execute(createDiscountCommand)
  }
}
