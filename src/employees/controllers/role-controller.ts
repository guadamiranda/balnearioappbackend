import { RoleService } from '../services/role-services';
import { RoleEntity } from '../domain/role-entity';
import { 
  Controller,
  Get, 
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get('/')
  async findAllRoles(): Promise<RoleEntity[]> {
    try {
      return await this.roleService.getAllRoles()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
