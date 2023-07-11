import { DiscountEntity } from "../../domain/discount-entity";

export abstract class IGetDiscountsUseCase {
    abstract execute() : Promise<DiscountEntity[]>
}