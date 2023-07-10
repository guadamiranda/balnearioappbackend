import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './shared/infrastructure/connection/supabase-connections';
import { ReservesModule } from './reserves/reserves.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, ReservesModule],
  controllers: [],
  providers: [{provide: IRepositoryConnection, useClass: SupabaseConnection}],
  exports: [
    IRepositoryConnection
  ]
})
export class AppModule {}
