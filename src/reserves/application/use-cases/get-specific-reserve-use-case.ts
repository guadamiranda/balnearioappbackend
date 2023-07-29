import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IGetSpecificReserveUseCase } from "./get-specific-reserve-use-case-interface";
import { ReserveEntity } from "../../domain/reserve-entity";
import { GetSpecificCommand } from "./command/get-specific";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetSpecificReserveUseCase implements IGetSpecificReserveUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    
    async execute(getSpecificCommand: GetSpecificCommand): Promise<ReserveEntity> {
        return await this.reserveRepository.getSpecificReserve(getSpecificCommand.dni, getSpecificCommand.carPlate);
    }
}