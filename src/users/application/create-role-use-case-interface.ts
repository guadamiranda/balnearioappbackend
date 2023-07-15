import { CreateRoleCommand } from "./commands/create-role-command";
import { RoleEntity } from "../domain/role-entity";

export abstract class ICreateRoleUseCase {
    abstract execute(createRoleCommand: CreateRoleCommand): Promise<RoleEntity>
}