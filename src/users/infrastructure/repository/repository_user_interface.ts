import { RoleEntity } from "../../domain/role-entity";
import { UserEntity } from '../../domain/user-entity';

export abstract class IRepositoryUsers {
    abstract authUser(email: string, password: string): Promise<UserEntity | null>
    abstract createRole(roleEntity: RoleEntity) : Promise<RoleEntity>;
    abstract updateRole(roleEntity: RoleEntity) : Promise<RoleEntity>;
    abstract deleteRole(id: string) : Promise<boolean>;
    abstract getRoles() : Promise<RoleEntity[]>;
}