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

    async updatePrice(id: string, amount: number): Promise<PriceEntity> {
        const existPrice = await this.priceRepository.findOne(id)
        if(!existPrice) 
            throw Error(`El precio con el id ${id} no existe`)

        return await this.priceRepository.updateOne(id,amount)
    }
}