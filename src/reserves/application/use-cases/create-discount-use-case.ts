import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { CreateDiscountCommand } from "./command/create-discount-command";
import { ICreateDiscountUseCase } from "./create-discount-use-case-interface";
import { DiscountEntity } from "../../domain/discount-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateDiscountUseCase implements ICreateDiscountUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    
    async execute(createDiscountCommand: CreateDiscountCommand): Promise<DiscountEntity> {
        return await this.reserveRepository.createDiscount(
            new DiscountEntity('', createDiscountCommand.name, createDiscountCommand.percentage)
        )
    }
}