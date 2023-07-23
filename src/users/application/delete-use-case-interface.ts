import { DeleteCommand } from "./commands/delete-command";

export abstract class IDeleteUseCase {
    abstract execute(deleteCommand: DeleteCommand): Promise<boolean>
}