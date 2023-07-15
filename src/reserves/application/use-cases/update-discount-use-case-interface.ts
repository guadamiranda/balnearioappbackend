import { UpdateDiscountCommand } from "./command/update-discount-command";
import { DiscountEntity } from "../../domain/discount-entity";

export abstract class IUpdateDiscountUseCase {
    abstract execute(updateDiscountCommand: UpdateDiscountCommand) : Promise<DiscountEntity>
}