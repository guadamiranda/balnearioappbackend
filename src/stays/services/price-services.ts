import { PriceRepository } from "../repository/price-repository";
import { PriceEntity } from "src/reserves/domain/price-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PriceServices {
    constructor(
        private readonly priceRepository: PriceRepository
    ) {}

    async getAllPrices(): Promise<PriceEntity[]> {
        return await this.priceRepository.findAll()
    }
}