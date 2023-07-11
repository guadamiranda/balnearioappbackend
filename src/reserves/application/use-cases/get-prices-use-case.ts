import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IGetPricesUseCase } from "./get-prices-use-case-interface";
import { PriceEntity } from "../../domain/price-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetPricesUseCase implements IGetPricesUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}

    async execute() : Promise<PriceEntity[]> {
        return await this.reserveRepository.getPrices()
    }
}