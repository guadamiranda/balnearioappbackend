import { CreateVisitorRequest } from './dto/create-visitor-request';
import { CreateGroupRequest } from './dto/create-group-request';
import { CreateStayRequest } from './dto/create-stay-request';
import { StayServices } from '../services/stay-services';
import { StayEntity } from '../domain/stay-entity';
import { 
  Controller,
  Headers,
  Get, 
  Param, 
  Post, 
  Req, 
  Put,
  Delete,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('stay')
@UseGuards(AuthGuard('jwt'))
export class StayController {
  constructor(
    private readonly stayServices: StayServices
  ) {}

  @Post('/')
  async createStay(@Body() stayDto:CreateStayRequest, @Request() req): Promise<StayEntity> {
    try {
      const {
        stayEntity,
        groupEntity,
        visitorEntities
      } = this.getEsentialData(stayDto, req.user.workshiftId)

      return await this.stayServices.buildStayCamping(stayEntity, groupEntity, visitorEntities)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/day')
  async createStayDay(@Body() stayDto:CreateStayRequest, @Request() req): Promise<StayEntity> {
    try {
      const {
        stayEntity,
        groupEntity,
        visitorEntities
      } = this.getEsentialData(stayDto, req.user.workshiftId)

      return await this.stayServices.buildStay(stayEntity, groupEntity, visitorEntities)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private getEsentialData( stayDto:CreateStayRequest, workshiftId: any) {
    return {
      stayEntity: CreateStayRequest.getStayEntity(stayDto),
      groupEntity: CreateGroupRequest.getGroupEntity(stayDto.group, workshiftId),
      visitorEntities: stayDto.visitors.map(visitor => CreateVisitorRequest.getVisitorEntity(visitor))
    }
  }

  @Get('/active')
  async getActivesStays(): Promise<StayEntity[]> {
    try {
      return await this.stayServices.getActiveStays()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete('/')
  async deleteStays(@Body() body): Promise<boolean> {
    try {
      return await this.stayServices.deleteStays(body.ids)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  //TODO: Tengo que crear el DTO response
  @Get('/:id')
  async getSpecificStay(@Param('id') id: string): Promise<any> {
    try {
      const stay = await this.stayServices.findSpecificStay([id])
      return stay
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/visitor/:dni')
  async getSpecificStayByDni(@Param('dni') dni: string): Promise<any> {
    try {
      const stay = await this.stayServices.getSpecificStayByDni(dni)
      return stay
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /*@Put(UPDATE_ROLE_PATH)
  async updateRole(@Headers() headers: any, @Param('id') id: string, @Body() body: UpdateRoleBodyDto): Promise<RoleEntity> {
    const updateRoleCommand = new UpdateRoleCommand(
      id, body.name
    )
    return await this.updateRoleUseCase.execute(updateRoleCommand)
  }

  @UseGuards(AdminGuard)
  @Post(ROLE_PATH)
  async createRole(@Headers() headers: any, @Param('id') id: string, @Body() body: CreateRoleRequestDto): Promise<RoleEntity> {
    const createRoleCommand = new CreateRoleCommand(
        body.name
    )
    return await this.createRoleUseCase.execute(createRoleCommand)
  }

  @UseGuards(AdminGuard)
  @Delete(DELETE_ROLE_PATH)
  async deleteRole(@Headers() headers: any, @Param('id') id: string): Promise<DeleteRoleResponseDto | null> {
    const deletePriceCommand = new DeleteRoleCommand(id)
    return await this.deleteRoleUseCase.execute(deletePriceCommand)
  }

  @Post(USER_AUTHENTICATE_PATH)
  async userAuthenticate(@Body() body: UserAuthBodyDto): Promise<AuthEntity | null> {
    const authReponse = await this.authUseCase.execute(new AuthCommand(body.email, body.password));

    if(authReponse) return authReponse
    throw new HttpException('InvalidUser', HttpStatus.UNAUTHORIZED)
  }

  @UseGuards(EmployeGuard)
  @Put(USER_WORKSHIFT_FINISH_PATH)
  async finishWorksfhit(@Param('id') id: string, @Body() body: FinishWorkshiftRequestDto): Promise<FinishWorkshitResponseDto | null> {
    const isFinished = await this.finishWorkshiftUseCase.execute(new FinishWorkshiftCommand(id, body.observations));

    if(isFinished) return new FinishWorkshitResponseDto(id);
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @UseGuards(AdminGuard)
  @Post(USER_PATH)
  async createEmploye(@Body() body: CreateRequestDto): Promise<UserEntity> {
    const { dni, firstName, lastName, roleId, password, email } = body;
    const employe = await this.createUseCase.execute(
      new CreateCommand(dni, firstName, lastName, password, email, roleId)
      );

    if(employe) return employe
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @UseGuards(AdminGuard)
  @Put(USER_UPDATE_PATH)
  async updateEmploye(@Param('id') id: string, @Body() body: CreateRequestDto): Promise<UserEntity> {
    const { dni, firstName, lastName, roleId, password, email } = body;
    const employe = await this.updateUseCase.execute(
      new UpdateCommand(
        id, 
        dni, 
        firstName, 
        lastName, 
        password, 
        email, 
        roleId
        )
      );

    if(employe) return employe
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @UseGuards(AdminGuard)
  @Delete(USER_UPDATE_PATH)
  async deleteEmploye(@Param('id') id: string): Promise<DeleteResponseDto> {
    const response = await this.deleteUseCase.execute(new DeleteCommand(id));
    if(response) return new DeleteResponseDto(id);
    
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @UseGuards(AdminGuard)
  @Get(USER_PATH)
  async getEmployes(): Promise<UserEntity[]> {
    const response = await this.getUseCase.execute();
    
    if(response) return response;
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }*/
}

