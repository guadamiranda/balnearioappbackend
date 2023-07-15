import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IUpdateDiscountUseCase } from "./update-discount-use-case-interface";
import { UpdateDiscountCommand } from "./command/update-discount-command";
import { DiscountEntity } from "../../domain/discount-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateDiscountUseCase implements IUpdateDiscountUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(updateDiscountCommand: UpdateDiscountCommand) : Promise<DiscountEntity> {
        const {id, name, percentage} = updateDiscountCommand
        const discountEntity = new DiscountEntity(id, name, percentage)
        return await this.reserveRepository.updateDiscount(discountEntity)
    }
}