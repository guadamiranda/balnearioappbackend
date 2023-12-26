import { EmployeeController } from './controllers/employe-controller';
import { EmployeeRepository } from './repository/employee-repository';
import { WorkshiftService } from './services/workshift-services';
import { RoleController } from './controllers/role-controller';
import { EmployeeService } from './services/employe-services';
import { RoleRepository } from './repository/role-repository';
import { SharedModule } from '../shared/shared.module';
import { RoleService } from './services/role-services';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule],
  controllers: [EmployeeController, RoleController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    RoleService,
    RoleRepository,
    WorkshiftService,
  ],
  exports: [EmployeeService, RoleService]
})
export class EmployeesModule {}
