import { CreateEmployeeRequest } from './dto/create-employee-request';
import { EmployeeService } from '../services/employe-services';
import { EmployeEntity } from '../domain/employe-entity';
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
  HttpStatus
} from '@nestjs/common';
import { UpdateEmployeeRequest } from './dto/update-employee-request';
import { AuthGuard } from '@nestjs/passport';

@Controller('employee')
@UseGuards(AuthGuard('jwt'))
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService
  ) {}

  @Post('/')
  async createEmployee(@Body() employeeDto:CreateEmployeeRequest): Promise<EmployeEntity> {
    try {
      //TODO: El endpoint no deberia de devolver el password del user
      const employeeEntity = CreateEmployeeRequest.convertToEntity(employeeDto)
      return await this.employeeService.createEmployee(employeeEntity)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('/')
  async findAllEmployees(): Promise<EmployeEntity[]> {
    try {
      return await this.employeeService.getAllEmployees()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put('/')
  async updateEmployee(@Body() employeeDto:UpdateEmployeeRequest): Promise<EmployeEntity> {
    try {
      const employeeEntity = UpdateEmployeeRequest.convertToEntity(employeeDto)
      return await this.employeeService.updateEmployee(employeeEntity)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete('/')
  async dismissEmployee(@Body() dtoDelete): Promise<Object> {
    try {
      return await this.employeeService.dismissalEmployeesByIds(dtoDelete.dnis)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
