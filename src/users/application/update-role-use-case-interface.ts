import { UpdateRoleCommand } from './commands/update-role-command';
import { RoleEntity } from "../domain/role-entity";

export abstract class IUpdateRoleUseCase {
    abstract execute(updateDeleteCommand: UpdateRoleCommand): Promise<RoleEntity>
}