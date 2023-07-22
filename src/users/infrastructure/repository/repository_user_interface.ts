import { WorkshiftEntity } from '../../domain/workshift-entity';
import { RoleEntity } from "../../domain/role-entity";
import { UserEntity } from '../../domain/user-entity';

export abstract class IRepositoryUsers {
    abstract initWorkshift(workshiftEntity: WorkshiftEntity): Promise<WorkshiftEntity | boolean>;
    abstract finishWorkshift(workshiftId: string, observation:string): Promise<boolean>;
    abstract authUser(email: string, password: string): Promise<UserEntity | null>
    abstract createRole(roleEntity: RoleEntity) : Promise<RoleEntity>;
    abstract updateRole(roleEntity: RoleEntity) : Promise<RoleEntity>;
    abstract deleteRole(id: string) : Promise<boolean>;
    abstract getRoles() : Promise<RoleEntity[]>;
}