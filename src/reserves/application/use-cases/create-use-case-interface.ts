import { ReserveEntity } from "../../domain/reserve-entity";
import { CreateCommand } from "./command/create-command";

export abstract class ICreateUseCase {
    abstract execute(createCommand: CreateCommand): Promise<ReserveEntity>
}