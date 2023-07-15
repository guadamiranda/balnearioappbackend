import { RoleEntity } from "../domain/role-entity";

export abstract class IGetRolesUseCase {
    abstract execute(): Promise<RoleEntity[]>
}