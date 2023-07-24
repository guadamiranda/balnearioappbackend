import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IUpdatePriceUseCase } from "./update-price-use-case-interface";
import { PriceEntity } from "../../domain/price-entity";
import { Injectable } from "@nestjs/common";
import { UpdatePriceCommand } from './command/update-price-command';

@Injectable()
export class UpdatePriceUseCase implements IUpdatePriceUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(updatePriceCommand: UpdatePriceCommand) : Promise<PriceEntity> {
        
        const {id, name, amount} = updatePriceCommand
        const priceEntity = new PriceEntity(id, name, amount)
        return await this.reserveRepository.updatePrice(priceEntity)
    }
}