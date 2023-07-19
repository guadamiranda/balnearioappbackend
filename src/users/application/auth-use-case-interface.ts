import { AuthCommand } from "./commands/auth-command";
import { AuthEntity } from "../domain/auth-entity";

export abstract class IAuthUseCase {
    abstract execute(authCommand: AuthCommand): Promise<AuthEntity>
}