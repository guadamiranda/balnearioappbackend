import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IGetDiscountsUseCase } from "./get-discounts-use-case-interface";
import { DiscountEntity } from "../../domain/discount-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetDiscountsUseCase implements IGetDiscountsUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    
    async execute(): Promise<DiscountEntity[]> {
        return await this.reserveRepository.getDiscounts()
    }
}