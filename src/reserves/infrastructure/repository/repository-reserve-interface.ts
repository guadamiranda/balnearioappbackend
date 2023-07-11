import { DiscountEntity } from "../../domain/discount-entity";
import { PriceEntity } from "../../domain/price-entity";

export abstract class IRepositoryReserve {
    abstract getPrices() : Promise<PriceEntity[]>
    abstract getDiscounts(): Promise<DiscountEntity[]>
}