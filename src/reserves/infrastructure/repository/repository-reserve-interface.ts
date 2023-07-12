import { DiscountEntity } from "../../domain/discount-entity";
import { PriceEntity } from "../../domain/price-entity";

export abstract class IRepositoryReserve {
    abstract createDiscount(discountEntity: DiscountEntity): Promise<DiscountEntity>;
    abstract createPrice(priceEntity: PriceEntity): Promise<PriceEntity>;
    abstract getDiscounts(): Promise<DiscountEntity[]>;
    abstract getPrices(): Promise<PriceEntity[]>;
}