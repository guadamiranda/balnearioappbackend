import { IRepositoryConnection } from '../shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from '../shared/infrastructure/connection/supabase-connections';
import { SupaBaseRepositoryUser } from './infrastructure/repository/supabase_user_repository';
import { IFinishWorkshiftUseCase } from './application/finish-workshift-use-case-interface';
import { IRepositoryUsers } from './infrastructure/repository/repository_user_interface';
import { UserController } from './infrastructure/handlers/controllers/user-controller';
import { ICreateRoleUseCase } from './application/create-role-use-case-interface';
import { IUpdateRoleUseCase } from './application/update-role-use-case-interface';
import { IDeleteRoleUseCase } from './application/delete-role-use-case-interface';
import { FinishWorkshiftUseCase } from './application/finish-workshift-use-case';
import { IGetRolesUseCase } from './application/get-roles-use-case-interface';
import { ICreateUseCase } from './application/create-use-case-interface';
import { IDeleteUseCase } from './application/delete-use-case-interface';
import { IUpdateUseCase } from './application/update-use-case-interface';
import { CreateRoleUseCase } from './application/create-role-use-case';
import { UpdateRoleUseCase } from './application/update-role-use-case';
import { DeleteRoleUseCase } from './application/delete-role-use-case';
import { IAuthUseCase } from './application/auth-use-case-interface';
import { GetRolesUseCase } from './application/get-roles-use-case';
import { IGetUseCase } from './application/get-use-case-interface';
import { CreateUseCase } from './application/create-use-case';
import { DeleteUseCase } from './application/delete-use-case';
import { UpdateUseCase } from './application/update-use-case';
import { AuthUseCase } from './application/auth-use-case';
import { GetUseCase } from './application/get-use-case';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserController],
    providers:[
        {provide: IFinishWorkshiftUseCase, useClass: FinishWorkshiftUseCase},
        {provide: IRepositoryConnection, useClass: SupabaseConnection},
        {provide: IRepositoryUsers, useClass: SupaBaseRepositoryUser},
        {provide: ICreateRoleUseCase, useClass: CreateRoleUseCase},
        {provide: IDeleteRoleUseCase, useClass: DeleteRoleUseCase},
        {provide: IUpdateRoleUseCase, useClass: UpdateRoleUseCase},
        {provide: IGetRolesUseCase, useClass: GetRolesUseCase},
        {provide: IDeleteUseCase, useClass: DeleteUseCase},
        {provide: ICreateUseCase, useClass: CreateUseCase},
        {provide: IUpdateUseCase, useClass: UpdateUseCase},
        {provide: IAuthUseCase, useClass: AuthUseCase},
        {provide: IGetUseCase, useClass: GetUseCase},
    ],
    exports: [
        IFinishWorkshiftUseCase,
        IRepositoryConnection,
        IDeleteRoleUseCase,
        ICreateRoleUseCase,
        IUpdateRoleUseCase,
        IRepositoryUsers,
        IGetRolesUseCase,
        ICreateUseCase,
        IUpdateUseCase,
        IDeleteUseCase,
        IAuthUseCase,
        IGetUseCase,
    ]
})
export class UsersModule {}
