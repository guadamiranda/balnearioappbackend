import { CreatePriceCommand } from "./command/create-price-command";
import { PriceEntity } from "../../domain/price-entity";

export abstract class ICreatePriceUseCase {
    abstract execute(createPriceCommand: CreatePriceCommand): Promise<PriceEntity>
}