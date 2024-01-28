import { WorkshiftController } from './controllers/workshift-controller';
import { WorkshiftRepository } from './repository/workshift-repository';
import { EmployeeController } from './controllers/employe-controller';
import { EmployeeRepository } from './repository/employee-repository';
import { WorkshiftService } from './services/workshift-services';
import { DevsController } from './controllers/devs-controller';
import { RoleController } from './controllers/role-controller';
import { EmployeeService } from './services/employe-services';
import { RoleRepository } from './repository/role-repository';
import { SharedModule } from '../shared/shared.module';
import { RoleService } from './services/role-services';
import { StaysModule } from '../stays/stays.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule, StaysModule],
  controllers: [
    EmployeeController, 
    RoleController, 
    WorkshiftController, 
    DevsController
  ],
  providers: [
    EmployeeService,
    EmployeeRepository,
    RoleService,
    RoleRepository,
    WorkshiftService,
    WorkshiftRepository,
  ],
  exports: [EmployeeService, RoleService, WorkshiftService]
})
export class EmployeesModule {}
