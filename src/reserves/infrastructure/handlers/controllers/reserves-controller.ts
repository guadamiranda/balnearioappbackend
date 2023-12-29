import { IGetSpecificReserveUseCase } from '../../../application/use-cases/get-specific-reserve-use-case-interface';
import { ICreateDiscountUseCase } from '../../../application/use-cases/create-discount-use-case-interface';
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
import { IGetActivesReservesUseCase } from '../../../application/use-cases/get-use-case-interface';
import { ReserveCreateDiscountBodyDto } from '../dto/request/reserve-create-discount-request.dto';
import { ReserveDeletePriceResponseDto } from '../dto/response/reserve-delete-price-response.dto';
import { IGetPricesUseCase } from '../../../application/use-cases/get-prices-use-case-interface';
import { CreatePriceCommand } from '../../../application/use-cases/command/create-price-command';
import { ReserveCreatePriceBodyDto } from '../dto/request/reserve-create-price-request.dto';
import { ICreateUseCase } from '../../../application/use-cases/create-use-case-interface';
import { IDeleteUseCase } from '../../../application/use-cases/delete-use-case-interface';
import { GetSpecificCommand } from '../../../application/use-cases/command/get-specific';
import { ReserveCreateResponseDto } from '../dto/response/reserve-create-response.dto';
import { ReserveDeleteResponseDto } from '../dto/response/reserve-delete-response.dto';
import { EmployeGuard } from '../../../../shared/infrastructure/guards/employe-guard';
import { CreateCommand } from '../../../application/use-cases/command/create-command';
import { SpecificReserveQueryDto } from '../dto/request/reserve-specific-request.dto';
import { DeleteCommand } from '../../../application/use-cases/command/delete-command';
import { AdminGuard } from '../../../../authenticate/guards/admin-guard';
import { ReserveCreateBodyDto } from '../dto/request/reserve-create-request.dto';
import { DiscountEntity } from '../../../domain/discount-entity';
import { ReserveEntity } from '../../../domain/reserve-entity';
import { PriceEntity } from '../../../domain/price-entity';
import { 
    RESERVE_CONTROLLER_BASE_PATH,
    RESERVE_DELETE_PRICES_PATH,
    RESERVE_PUT_PRICES_PATH,
    RESERVE_DISCOUNT_PATH,
    RESERVE_PRICES_PATH,
    RESERVE_POST_PATH,
    RESERVE_DELETE_DISCOUNT_PATH,
    RESERVE_PUT_DISCOUNT_PATH,
    RESERVE_GET_ACTIVES_PATH,
    RESERVE_BASE_PATH,
    RESERVE_DELETE_PATH, 
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
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';





@Controller(RESERVE_CONTROLLER_BASE_PATH)
export class ReservesController {
  constructor(
    private readonly getSpecificReserveUseCase: IGetSpecificReserveUseCase,
    private readonly getActivesReservesUseCase: IGetActivesReservesUseCase,
    private readonly createDiscountUseCase: ICreateDiscountUseCase,
    private readonly deleteDiscountUseCase: IDeleteDiscountUseCase,
    private readonly updateDiscountUseCase: IUpdateDiscountUseCase,
    private readonly getDiscountsUseCase: IGetDiscountsUseCase,
    private readonly createPriceUseCase: ICreatePriceUseCase,
    private readonly deletePriceUseCase: IDeletePriceUseCase,
    private readonly updatePriceUseCase: IUpdatePriceUseCase,
    private readonly getPricesUseCase: IGetPricesUseCase,
    private readonly createUseCase: ICreateUseCase,
    private readonly deleteUseCase: IDeleteUseCase,
  ) {}

  @UseGuards(EmployeGuard)
  @Post(RESERVE_POST_PATH)
  async create(@Body() body: ReserveCreateBodyDto): Promise<ReserveCreateResponseDto> {
    const createCommand = new CreateCommand(
        body.initDate, 
        body.finishDate,
        body.residents,
        body.vehicles,
        body.price,
        body.managerDni,
        body.managerFirstName,
        body.managerLastName, 
        body.managerCarPlate, 
        body.managerMemberNumber,
        body.workshiftId,
        body.amountHorses
      )
    const responseReserve = await this.createUseCase.execute(createCommand)
    if(responseReserve) return ReserveCreateResponseDto.mapReserveEntity(responseReserve); 

    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
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

  @UseGuards(EmployeGuard)
  @Get(RESERVE_GET_ACTIVES_PATH)
  async getActiveReserve(): Promise<ReserveEntity[]> {
    return await this.getActivesReservesUseCase.execute()
  }

  @UseGuards(EmployeGuard)
  @Get(RESERVE_BASE_PATH)
  async getSpecificReserve(@Query() queryParams: SpecificReserveQueryDto): Promise<ReserveEntity> {

    if(!queryParams.dni && !queryParams.carplate && !queryParams.membernumber) {
      throw new HttpException('Should send at least one query param (dni or carplate or membernumber)', HttpStatus.BAD_REQUEST)
    }

    if(queryParams.dni == '0') queryParams.dni = ''
    if(queryParams.membernumber == '') queryParams.membernumber = '0'
    if(queryParams.carplate == '') queryParams.carplate = '0'

    const specificReserveCommand = new GetSpecificCommand(queryParams.dni, queryParams.carplate, queryParams.membernumber)
    const specificReserve = await this.getSpecificReserveUseCase.execute(specificReserveCommand)

    if(specificReserve) return specificReserve;
    
    throw new HttpException('Not found reserve', HttpStatus.NOT_FOUND)
  }

  @UseGuards(EmployeGuard)
  @Delete(RESERVE_DELETE_PATH)  
  async deleteReserve(@Param('id') id: string): Promise<ReserveDeleteResponseDto | null> {
    const deleteCommand = new DeleteCommand(id)
    const response = await this.deleteUseCase.execute(deleteCommand)
    if(response) return response;
    
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
