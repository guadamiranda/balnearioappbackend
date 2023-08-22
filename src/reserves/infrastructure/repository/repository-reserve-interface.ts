import { ReserveEntity } from "src/reserves/domain/reserve-entity";
import { DiscountEntity } from "../../domain/discount-entity";
import { PriceEntity } from '../../domain/price-entity';

export abstract class IRepositoryReserve {
    abstract getSpecificReserve(dni: string, carPlate: string, memberNumber: string): Promise<ReserveEntity>;
    abstract createDiscount(discountEntity: DiscountEntity): Promise<DiscountEntity>;
    abstract updateDiscount(DiscountEntity: DiscountEntity): Promise<DiscountEntity>;
    abstract create(reserveEntity: ReserveEntity): Promise<ReserveEntity>;
    abstract update(reserveEntity: ReserveEntity): Promise<ReserveEntity>;
    abstract createPrice(priceEntity: PriceEntity): Promise<PriceEntity>;
    abstract updatePrice(PriceEntity: PriceEntity): Promise<PriceEntity>;
    abstract getActivesReserves(): Promise<ReserveEntity[]>;
    abstract deleteDiscount(id: string): Promise<boolean>;
    abstract deletePrice(id: string): Promise<boolean>;
    abstract getDiscounts(): Promise<DiscountEntity[]>;
    abstract delete(id: string): Promise<boolean>;
    abstract getPrices(): Promise<PriceEntity[]>;
}