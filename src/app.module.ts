import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './shared/infrastructure/connection/supabase-connections';
import { EmployeesModule } from './employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { StaysModule } from './stays/stays.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [StaysModule, SharedModule, EmployeesModule],
  controllers: [],
  providers: [{provide: IRepositoryConnection, useClass: SupabaseConnection}],
  exports: [
    SharedModule
  ]
})
export class AppModule {}
