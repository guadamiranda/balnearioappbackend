import { IFinishWorkshiftUseCase } from 'src/users/application/finish-workshift-use-case-interface';
import { FinishWorkshiftCommand } from 'src/users/application/commands/finish-workshift-command';
import { IUpdateRoleUseCase } from 'src/users/application/update-role-use-case-interface';
import { IDeleteRoleUseCase } from 'src/users/application/delete-role-use-case-interface';
import { ICreateRoleUseCase } from 'src/users/application/create-role-use-case-interface';
import { FinishWorkshitResponseDto } from '../dto/response/finish-workshift-response.dto';
import { FinishWorkshiftRequestDto } from '../dto/request/finish-workshift-request.dto';
import { UpdateRoleCommand } from 'src/users/application/commands/update-role-command';
import { DeleteRoleCommand } from 'src/users/application/commands/delete-role-command';
import { IGetRolesUseCase } from 'src/users/application/get-roles-use-case-interface';
import { CreateRoleCommand } from '../../../application/commands/create-role-command';
import { EmployeGuard } from '../../../../shared/infrastructure/guards/employe-guard';
import { AdminGuard } from '../../../../authenticate/guards/admin-guard';
import { DeleteRoleResponseDto } from '../dto/response/delete-role-response.dto';
import { ICreateUseCase } from '../../../application/create-use-case-interface';
import { IDeleteUseCase } from '../../../application/delete-use-case-interface';
import { IUpdateUseCase } from '../../../application/update-use-case-interface';
import { CreateRoleRequestDto } from '../dto/request/create-role-request.dto';
import { CreateCommand } from '../../../application/commands/create-command';
import { IAuthUseCase } from 'src/users/application/auth-use-case-interface';
import { UpdateCommand } from '../../../application/commands/update-command';
import { DeleteCommand } from '../../../application/commands/delete-command';
import { UpdateRoleBodyDto } from '../dto/request/update-role-request.dto';
import { IGetUseCase } from '../../../application/get-use-case-interface';
import { AuthCommand } from 'src/users/application/commands/auth-command';
import { DeleteResponseDto } from '../dto/response/delete-response.dto';
import { UserAuthBodyDto } from '../dto/request/user-auth-request.dto';
import { CreateRequestDto } from '../dto/request/create-request.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthEntity } from 'src/users/domain/auth-entity';
import { RoleEntity } from 'src/users/domain/role-entity';
import { UserEntity } from '../../../domain/user-entity';
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
  UseGuards
} from '@nestjs/common';
import {
  USER_CONTROLLER_BASE_PATH,
  DELETE_ROLE_PATH,
  USER_PATH,
  ROLE_PATH,
  UPDATE_ROLE_PATH,
  USER_AUTHENTICATE_PATH,
  USER_WORKSHIFT_FINISH_PATH,
  USER_UPDATE_PATH,
} from '../../constants/constants'

@Controller(USER_CONTROLLER_BASE_PATH)
export class UserController {
  constructor(
    private readonly finishWorkshiftUseCase: IFinishWorkshiftUseCase,
    private readonly updateRoleUseCase: IUpdateRoleUseCase,
    private readonly deleteRoleUseCase: IDeleteRoleUseCase,
    private readonly createRoleUseCase: ICreateRoleUseCase,
    private readonly getRoleUseCase: IGetRolesUseCase,
    private readonly deleteUseCase: IDeleteUseCase,
    private readonly updateUseCase: IUpdateUseCase,
    private readonly createUseCase: ICreateUseCase,
    private readonly authUseCase: IAuthUseCase,
    private readonly getUseCase: IGetUseCase,
  ) {}

  @UseGuards(AdminGuard)
  @Get(ROLE_PATH)
  async getRoles(@Req() req:any): Promise<RoleEntity[]> {
    return await this.getRoleUseCase.execute()
  }

  @UseGuards(AdminGuard)
  @Put(UPDATE_ROLE_PATH)
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
  }
}
