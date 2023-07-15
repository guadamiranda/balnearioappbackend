import { UpdatePriceCommand } from "./command/update-price-command";
import { PriceEntity } from "../../domain/price-entity";

export abstract class IUpdatePriceUseCase {
    abstract execute(updatePriceCommand: UpdatePriceCommand) : Promise<PriceEntity>
}