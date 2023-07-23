import { CreateCommand } from "./commands/create-command";
import { UserEntity } from "../domain/user-entity";

export abstract class ICreateUseCase {
    abstract execute(createCommand: CreateCommand): Promise<UserEntity>
}