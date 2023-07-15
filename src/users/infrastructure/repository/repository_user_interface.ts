import { RoleEntity } from "../../domain/role-entity";

export abstract class IRepositoryUsers {
    abstract createRole(roleEntity: RoleEntity) : Promise<RoleEntity>;
    abstract updateRole(roleEntity: RoleEntity) : Promise<RoleEntity>;
    abstract deleteRole(id: string) : Promise<boolean>;
    abstract getRoles() : Promise<RoleEntity[]>;
}