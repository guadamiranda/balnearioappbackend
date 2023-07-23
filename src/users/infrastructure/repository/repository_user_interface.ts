import { WorkshiftEntity } from '../../domain/workshift-entity';
import { RoleEntity } from "../../domain/role-entity";
import { UserEntity } from '../../domain/user-entity';

export abstract class IRepositoryUsers {
    abstract initWorkshift(workshiftEntity: WorkshiftEntity): Promise<WorkshiftEntity | boolean>;
    abstract createEmploye(userEntity: UserEntity, password: string): Promise<UserEntity>;
    abstract finishWorkshift(workshiftId: string, observation:string): Promise<boolean>;
    abstract authUser(email: string, password: string): Promise<UserEntity | null>;
    abstract updateEmployes(userEntity: UserEntity): Promise<UserEntity>;
    abstract createRole(roleEntity: RoleEntity): Promise<RoleEntity>;
    abstract updateRole(roleEntity: RoleEntity): Promise<RoleEntity>;
    abstract deleteEmploye(id: string): Promise<boolean>;
    abstract deleteRole(id: string): Promise<boolean>;
    abstract getEmployes(): Promise<UserEntity[]>;
    abstract getRoles(): Promise<RoleEntity[]>;
}