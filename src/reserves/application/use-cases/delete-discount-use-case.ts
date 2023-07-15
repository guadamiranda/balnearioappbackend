import { ReserveDeleteDiscountResponseDto } from '../../infrastructure/handlers/dto/response/reserve-delete-discount-response.dto';
import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IDeleteDiscountUseCase } from "./delete-discount-use-case-interface";
import { DeleteDiscountCommand } from './command/delete-discount-command';
import { Injectable } from "@nestjs/common";


@Injectable()
export class DeleteDiscountUseCase implements IDeleteDiscountUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(deleteDiscountCommand: DeleteDiscountCommand) : Promise<ReserveDeleteDiscountResponseDto | null> {
        
        const {id} = deleteDiscountCommand
        if(this.reserveRepository.deleteDiscount(id)){
            return new ReserveDeleteDiscountResponseDto(id)
        }

        return null
    }
}