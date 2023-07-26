import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IGetActivesReservesUseCase } from "./get-use-case-interface";
import { ReserveEntity } from "src/reserves/domain/reserve-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetActivesReservesUseCase implements IGetActivesReservesUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    
    async execute(): Promise<ReserveEntity[]> {
        return await this.reserveRepository.getActivesReserves()
    }
}