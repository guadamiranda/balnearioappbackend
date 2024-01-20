import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './shared/infrastructure/connection/supabase-connections';
import { AuthenticateModule } from './authenticate/authenticates.module';
import { EmployeesModule } from './employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { StaysModule } from './stays/stays.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthenticateModule, StaysModule, SharedModule, EmployeesModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [{provide: IRepositoryConnection, useClass: SupabaseConnection}],
  exports: [
    SharedModule
  ]
})
export class AppModule {}
