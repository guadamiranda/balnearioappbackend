import { RoleEntity } from "../../domain/role-entity";

export abstract class IRepositoryUsers {
    abstract getRoles() : Promise<RoleEntity[]>
}