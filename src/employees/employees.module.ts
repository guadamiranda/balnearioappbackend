import { EmployeeController } from './controllers/employe-controller';
import { EmployeeRepository } from './repository/employee-repository';
import { EmployeeService } from './services/employe-services';
import { SharedModule } from '../shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository
  ],
  exports: []
})
export class EmployeesModule {}
