import { EmployeeController } from './controllers/employe-controller';
import { EmployeeRepository } from './repository/employee-repository';
import { EmployeeService } from './services/employe-services';
import { SharedModule } from '../shared/shared.module';
import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role-controller';
import { RoleService } from './services/role-services';
import { RoleRepository } from './repository/role-repository';

@Module({
  imports: [SharedModule],
  controllers: [EmployeeController, RoleController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    RoleService,
    RoleRepository
  ],
  exports: []
})
export class EmployeesModule {}
