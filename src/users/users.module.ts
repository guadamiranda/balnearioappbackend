import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/handlers/controllers/user-controller';
import { IRepositoryConnection } from '../shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from '../shared/infrastructure/connection/supabase-connections';

@Module({
    controllers: [UserController],
    providers:[
        {provide: IRepositoryConnection, useClass:SupabaseConnection}
    ]
})
export class UsersModule {}
