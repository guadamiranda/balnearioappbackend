import { UpdateCommand } from "./commands/update-command";
import { UserEntity } from "../domain/user-entity";

export abstract class IUpdateUseCase {
    abstract execute(updateCommand: UpdateCommand): Promise<UserEntity>
}