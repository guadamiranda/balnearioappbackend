import { ICreateDiscountUseCase } from 'src/reserves/application/use-cases/create-discount-use-case-interface';
import { ICreatePriceUseCase } from 'src/reserves/application/use-cases/create-price-use-case-interface';
import { IUpdatePriceUseCase } from 'src/reserves/application/use-cases/update-price-use-case-interface';
import { IDeletePriceUseCase } from 'src/reserves/application/use-cases/delete-price-use-case-interface';
import { IGetDiscountsUseCase } from '../../../application/use-cases/get-discounts-use-case-interface';
import { CreateDiscountCommand } from '../../../application/use-cases/command/create-discount-command';
import { UpdatePriceCommand } from 'src/reserves/application/use-cases/command/update-price-command';
import { DeletePriceCommand } from 'src/reserves/application/use-cases/command/delete-price-command';
import { ReserveCreateDiscountBodyDto } from '../dto/request/reserve-create-discount-request.dto';
import { ReserveDeletePriceResponseDto } from '../dto/response/reserve-delete-price-response.dto';
import { IGetPricesUseCase } from '../../../application/use-cases/get-prices-use-case-interface';
import { CreatePriceCommand } from '../../../application/use-cases/command/create-price-command';
import { ReserveCreatePriceBodyDto } from '../dto/request/reserve-create-price-request.dto';
import { ReserveCreateResponseDto } from '../dto/response/reserve-create-response.dto';
import { ReserveCreateRequestDto } from '../dto/request/reserve-create-request.dto';
import { DiscountEntity } from '../../../domain/discount-entity';
import { PriceEntity } from '../../../domain/price-entity';
import { 
    RESERVE_CONTROLLER_BASE_PATH,
    RESERVE_DELETE_PRICES_PATH,
    RESERVE_PUT_PRICES_PATH,
    RESERVE_DISCOUNT_PATH,
    RESERVE_PRICES_PATH,
    RESERVE_POST_PATH, 
} from '../../constants/constants';
import { 
  Controller, 
  Headers,
  Delete,
  Param,
  Post, 
  Body, 
  Get, 
  Req, 
  Put,
} from '@nestjs/common';



@Controller(RESERVE_CONTROLLER_BASE_PATH)
export class ReservesController {
  constructor(
    private readonly createDiscountUseCase: ICreateDiscountUseCase,
    private readonly getDiscountsUseCase: IGetDiscountsUseCase,
    private readonly createPriceUseCase: ICreatePriceUseCase,
    private readonly deletePriceUseCase: IDeletePriceUseCase,
    private readonly updatePriceUseCase: IUpdatePriceUseCase,
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

  @Put(RESERVE_PUT_PRICES_PATH)
  async updatePrice(@Headers() headers: any, @Param('id') id: string, @Body() body: ReserveCreatePriceBodyDto): Promise<PriceEntity> {
    const updatePriceCommand = new UpdatePriceCommand(
      id, body.name, body.amount
    )
    return await this.updatePriceUseCase.execute(updatePriceCommand)
  }

  @Delete(RESERVE_DELETE_PRICES_PATH)
  async deletePrice(@Headers() headers: any, @Param('id') id: string, @Body() body: ReserveCreatePriceBodyDto): Promise<ReserveDeletePriceResponseDto | null> {
    const deletePriceCommand = new DeletePriceCommand(id)
    return await this.deletePriceUseCase.execute(deletePriceCommand)
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
