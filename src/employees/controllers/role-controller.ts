import { RoleService } from '../services/role-services';
import { RoleEntity } from '../domain/role-entity';
import { 
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
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
