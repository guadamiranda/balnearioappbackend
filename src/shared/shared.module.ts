import { Module } from '@nestjs/common';
import { IRepositoryConnection } from 'src/shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './infrastructure/connection/supabase-connections';

@Module({
  imports: [],
  controllers: [],
  providers: [{provide: IRepositoryConnection, useClass: SupabaseConnection}],
  exports: [{provide: IRepositoryConnection, useClass: SupabaseConnection}]
})
export class SharedModule {}
