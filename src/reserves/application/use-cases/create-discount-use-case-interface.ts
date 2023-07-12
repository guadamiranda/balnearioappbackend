import { CreateDiscountCommand } from "./command/create-discount-command";
import { DiscountEntity } from "../../domain/discount-entity";

export abstract class ICreateDiscountUseCase {
    abstract execute(createDiscountCommand: CreateDiscountCommand) : Promise<DiscountEntity>
}