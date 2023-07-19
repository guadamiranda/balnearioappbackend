import { ICreateDiscountUseCase } from 'src/reserves/application/use-cases/create-discount-use-case-interface';
import { IDeleteDiscountUseCase } from '../../../application/use-cases/delete-discount-use-case-interface';
import { IUpdateDiscountUseCase } from '../../../application/use-cases/update-discount-use-case-interface';
import { ICreatePriceUseCase } from 'src/reserves/application/use-cases/create-price-use-case-interface';
import { IUpdatePriceUseCase } from 'src/reserves/application/use-cases/update-price-use-case-interface';
import { IDeletePriceUseCase } from 'src/reserves/application/use-cases/delete-price-use-case-interface';
import { ReserveDeleteDiscountResponseDto } from '../dto/response/reserve-delete-discount-response.dto';
import { UpdateDiscountCommand } from '../../../application/use-cases/command/update-discount-command';
import { IGetDiscountsUseCase } from '../../../application/use-cases/get-discounts-use-case-interface';
import { CreateDiscountCommand } from '../../../application/use-cases/command/create-discount-command';
import { DeleteDiscountCommand } from '../../../application/use-cases/command/delete-discount-command';
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
import { AdminGuard } from '../../../../shared/infrastructure/guards/admin-guard';
import { 
    RESERVE_CONTROLLER_BASE_PATH,
    RESERVE_DELETE_PRICES_PATH,
    RESERVE_PUT_PRICES_PATH,
    RESERVE_DISCOUNT_PATH,
    RESERVE_PRICES_PATH,
    RESERVE_POST_PATH,
    RESERVE_DELETE_DISCOUNT_PATH,
    RESERVE_PUT_DISCOUNT_PATH, 
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
  UseGuards,
} from '@nestjs/common';
import { EmployeGuard } from 'src/shared/infrastructure/guards/employe-guard';


@Controller(RESERVE_CONTROLLER_BASE_PATH)
export class ReservesController {
  constructor(
    private readonly createDiscountUseCase: ICreateDiscountUseCase,
    private readonly deleteDiscountUseCase: IDeleteDiscountUseCase,
    private readonly updateDiscountUseCase: IUpdateDiscountUseCase,
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

  @UseGuards(EmployeGuard)
  @Get(RESERVE_PRICES_PATH)
  async getPrices(): Promise<PriceEntity[]> {
    return await this.getPricesUseCase.execute()
  }

  @UseGuards(AdminGuard)
  @Put(RESERVE_PUT_PRICES_PATH)
  async updatePrice(@Headers() headers: any, @Param('id') id: string, @Body() body: ReserveCreatePriceBodyDto): Promise<PriceEntity> {
    const updatePriceCommand = new UpdatePriceCommand(
      id, body.name, body.amount
    )
    return await this.updatePriceUseCase.execute(updatePriceCommand)
  }

  @UseGuards(AdminGuard)
  @Delete(RESERVE_DELETE_PRICES_PATH)
  async deletePrice(@Headers() headers: any, @Param('id') id: string): Promise<ReserveDeletePriceResponseDto | null> {
    const deletePriceCommand = new DeletePriceCommand(id)
    return await this.deletePriceUseCase.execute(deletePriceCommand)
  }

  @UseGuards(AdminGuard)
  @Post(RESERVE_PRICES_PATH)
  async createPrice(@Headers() headers: any, @Body() body: ReserveCreatePriceBodyDto): Promise<PriceEntity> {
    const createDiscountCommand = new CreatePriceCommand(
      body.name, body.amount
    )
    
    return await this.createPriceUseCase.execute(createDiscountCommand)
  }

  @UseGuards(EmployeGuard)
  @Get(RESERVE_DISCOUNT_PATH)
  async getDiscounts(): Promise<DiscountEntity[]> {
    return await this.getDiscountsUseCase.execute()
  }

  @UseGuards(AdminGuard)
  @Put(RESERVE_PUT_DISCOUNT_PATH)
  async updateDiscount(@Headers() headers: any, @Param('id') id: string, @Body() body: ReserveCreateDiscountBodyDto): Promise<DiscountEntity> {
    const updateDiscountCommand = new UpdateDiscountCommand(
      id, body.name, body.percentage
    )
    return await this.updateDiscountUseCase.execute(updateDiscountCommand)
  }

  @UseGuards(AdminGuard)
  @Delete(RESERVE_DELETE_DISCOUNT_PATH)
  async deleteDiscount(@Headers() headers: any, @Param('id') id: string): Promise<ReserveDeleteDiscountResponseDto | null> {
    const deleteDiscountCommand = new DeleteDiscountCommand(id)
    return await this.deleteDiscountUseCase.execute(deleteDiscountCommand)
  }

  @UseGuards(AdminGuard)
  @Post(RESERVE_DISCOUNT_PATH)
  async createDiscount(@Headers() headers: any, @Body() body: ReserveCreateDiscountBodyDto): Promise<DiscountEntity> {
    const createDiscountCommand = new CreateDiscountCommand(
      body.name, body.percentage
    )

    return await this.createDiscountUseCase.execute(createDiscountCommand)
  }
}
