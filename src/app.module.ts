import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './shared/infrastructure/connection/supabase-connections';
import { ReservesModule } from './reserves/reserves.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { StaysModule } from './stays/stays.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [StaysModule, SharedModule],
  controllers: [],
  providers: [{provide: IRepositoryConnection, useClass: SupabaseConnection}],
  exports: [
    SharedModule
  ]
})
export class AppModule {}
