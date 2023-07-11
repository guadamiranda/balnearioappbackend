import { PriceEntity } from "../../domain/price-entity";

export abstract class IGetPricesUseCase {
    abstract execute() : Promise<PriceEntity[]>
}