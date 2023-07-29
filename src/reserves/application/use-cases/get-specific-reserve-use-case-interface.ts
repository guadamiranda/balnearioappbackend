import { ReserveEntity } from "../../domain/reserve-entity";
import { GetSpecificCommand } from './command/get-specific';

export abstract class IGetSpecificReserveUseCase {
    abstract execute(getSpecificCommand: GetSpecificCommand): Promise<ReserveEntity>
}