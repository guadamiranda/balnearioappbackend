import { ReserveEntity } from "src/reserves/domain/reserve-entity";

export abstract class IGetActivesReservesUseCase {
    abstract execute() : Promise<ReserveEntity[]>
}