import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { ICreatePriceUseCase } from "./create-price-use-case-interface";
import { CreatePriceCommand } from "./command/create-price-command";
import { PriceEntity } from "../../domain/price-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreatePriceUseCase implements ICreatePriceUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}

    async execute(createPriceCommand: CreatePriceCommand): Promise<PriceEntity> {
        return await this.reserveRepository.createPrice(
            new PriceEntity('', createPriceCommand.name, createPriceCommand.amount)
        )
    }
}