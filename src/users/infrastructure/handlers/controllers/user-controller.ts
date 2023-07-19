import { IUpdateRoleUseCase } from 'src/users/application/update-role-use-case-interface';
import { IDeleteRoleUseCase } from 'src/users/application/delete-role-use-case-interface';
import { ICreateRoleUseCase } from 'src/users/application/create-role-use-case-interface';
import { UpdateRoleCommand } from 'src/users/application/commands/update-role-command';
import { DeleteRoleCommand } from 'src/users/application/commands/delete-role-command';
import { IGetRolesUseCase } from 'src/users/application/get-roles-use-case-interface';
import { CreateRoleCommand } from '../../../application/commands/create-role-command';
import { AdminGuard } from '../../../../shared/infrastructure/guards/admin-guard';
import { EmployeGuard } from '../../../../shared/infrastructure/guards/employe-guard';
import { UserCreateResponseDto } from '../dto/response/user-create-response.dto';
import { DeleteRoleResponseDto } from '../dto/response/delete-role-response.dto';
import { UserCreateRequestDto } from '../dto/request/user-create-request.dto';
import { CreateRoleRequestDto } from '../dto/request/create-role-request.dto';
import { UpdateRoleBodyDto } from '../dto/request/update-role-request.dto';
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
} from '../../constants/constants'

@Controller(USER_CONTROLLER_BASE_PATH)
export class UserController {
  constructor(
    private readonly updateRoleUseCase: IUpdateRoleUseCase,
    private readonly deleteRoleUseCase: IDeleteRoleUseCase,
    private readonly createRoleUseCase: ICreateRoleUseCase,
    private readonly getRoleUseCase: IGetRolesUseCase,
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
  userAuthenticate(@Req() req: UserCreateRequestDto): Promise<UserCreateResponseDto> {
    const SECRETJWT = "ZdIpYY4saZIzK16xC3VgfDCWIUhYU7wz+0uasyZm90JxmVgGgMEyInAOomb1XgcbCBilGPFuXeBe5T3poceFVg=="
    return new Promise<UserCreateResponseDto>((resolve, reject) => {
      const response = new UserCreateResponseDto('40415923','alibaba@hotmail.com', 'Joni', 'test', '43');
      // Aquí puedes realizar cualquier lógica adicional necesaria antes de resolver la promesa
      resolve(response);
    });
  }
}
