import { IRepositoryConnection } from '../shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from '../shared/infrastructure/connection/supabase-connections';
import { SupaBaseRepositoryUser } from './infrastructure/repository/supabase_user_repository';
import { IRepositoryUsers } from './infrastructure/repository/repository_user_interface';
import { UserController } from './infrastructure/handlers/controllers/user-controller';
import { ICreateRoleUseCase } from './application/create-role-use-case-interface';
import { IUpdateRoleUseCase } from './application/update-role-use-case-interface';
import { IDeleteRoleUseCase } from './application/delete-role-use-case-interface';
import { IGetRolesUseCase } from './application/get-roles-use-case-interface';
import { CreateRoleUseCase } from './application/create-role-use-case';
import { UpdateRoleUseCase } from './application/update-role-use-case';
import { DeleteRoleUseCase } from './application/delete-role-use-case';
import { IAuthUseCase } from './application/auth-use-case-interface';
import { GetRolesUseCase } from './application/get-roles-use-case';
import { AuthUseCase } from './application/auth-use-case';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserController],
    providers:[
        {provide: IRepositoryConnection, useClass: SupabaseConnection},
        {provide: IRepositoryUsers, useClass: SupaBaseRepositoryUser},
        {provide: ICreateRoleUseCase, useClass: CreateRoleUseCase},
        {provide: IDeleteRoleUseCase, useClass: DeleteRoleUseCase},
        {provide: IUpdateRoleUseCase, useClass: UpdateRoleUseCase},
        {provide: IGetRolesUseCase, useClass: GetRolesUseCase},
        {provide: IAuthUseCase, useClass: AuthUseCase},
    ],
    exports: [
        IRepositoryConnection,
        IDeleteRoleUseCase,
        ICreateRoleUseCase,
        IUpdateRoleUseCase,
        IRepositoryUsers,
        IGetRolesUseCase,
        IAuthUseCase,
    ]
})
export class UsersModule {}
