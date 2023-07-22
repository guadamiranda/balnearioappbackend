
import { IFinishWorkshiftUseCase } from 'src/users/application/finish-workshift-use-case-interface';
import { FinishWorkshiftCommand } from 'src/users/application/commands/finish-workshift-command';
import { IUpdateRoleUseCase } from 'src/users/application/update-role-use-case-interface';
import { IDeleteRoleUseCase } from 'src/users/application/delete-role-use-case-interface';
import { ICreateRoleUseCase } from 'src/users/application/create-role-use-case-interface';
import { finishWorkshiftRequestDto } from '../dto/request/finish-workshift-request.dto';
import { UpdateRoleCommand } from 'src/users/application/commands/update-role-command';
import { DeleteRoleCommand } from 'src/users/application/commands/delete-role-command';
import { IGetRolesUseCase } from 'src/users/application/get-roles-use-case-interface';
import { CreateRoleCommand } from '../../../application/commands/create-role-command';
import { EmployeGuard } from '../../../../shared/infrastructure/guards/employe-guard';
import { AdminGuard } from '../../../../shared/infrastructure/guards/admin-guard';
import { DeleteRoleResponseDto } from '../dto/response/delete-role-response.dto';
import { CreateRoleRequestDto } from '../dto/request/create-role-request.dto';
import { IAuthUseCase } from 'src/users/application/auth-use-case-interface';
import { UpdateRoleBodyDto } from '../dto/request/update-role-request.dto';
import { AuthCommand } from 'src/users/application/commands/auth-command';
import { UserAuthBodyDto } from '../dto/request/user-auth-request.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthEntity } from 'src/users/domain/auth-entity';
import { RoleEntity } from 'src/users/domain/role-entity';
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
  USER_POST_PATH,
  ROLE_PATH,
  UPDATE_ROLE_PATH,
  USER_AUTHENTICATE_PATH,
  USER_WORKSHIFT_FINISH_PATH,
} from '../../constants/constants'
import { FinishWorkshitResponseDto } from '../dto/response/finish-workshift-response.dto';

@Controller(USER_CONTROLLER_BASE_PATH)
export class UserController {
  constructor(
    private readonly finishWorkshiftUseCase: IFinishWorkshiftUseCase,
    private readonly updateRoleUseCase: IUpdateRoleUseCase,
    private readonly deleteRoleUseCase: IDeleteRoleUseCase,
    private readonly createRoleUseCase: ICreateRoleUseCase,
    private readonly getRoleUseCase: IGetRolesUseCase,
    private readonly authUseCase: IAuthUseCase,
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

    if(authReponse) {
      return authReponse
    }
    throw new HttpException('InvalidUser', HttpStatus.UNAUTHORIZED)
  }

  @UseGuards(EmployeGuard)
  @Put(USER_WORKSHIFT_FINISH_PATH)
  async finishWorksfhit(@Param('id') id: string, @Body() body: finishWorkshiftRequestDto): Promise<FinishWorkshitResponseDto | null> {
    const isFinished = await this.finishWorkshiftUseCase.execute(new FinishWorkshiftCommand(id, body.observations));

    if(isFinished) {
      return new FinishWorkshitResponseDto(id);
    }
    throw new HttpException('Error, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
