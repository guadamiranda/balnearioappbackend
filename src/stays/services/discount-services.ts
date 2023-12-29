import { DiscountRepository } from "../repository/discount-repository";
import { DiscountEntity } from "../domain/discount-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DiscountServices {
    constructor(
        private readonly discountRepository: DiscountRepository
    ) {}

    async getAllPrices(): Promise<DiscountEntity[]> {
        return await this.discountRepository.findAll()
    }
}