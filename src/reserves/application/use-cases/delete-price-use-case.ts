import { ReserveDeletePriceResponseDto } from '../../infrastructure/handlers/dto/response/reserve-delete-price-response.dto';
import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IDeletePriceUseCase } from "./delete-price-use-case-interface";
import { DeletePriceCommand } from './command/delete-price-command';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeletePriceUseCase implements IDeletePriceUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(deletePriceCommand: DeletePriceCommand) : Promise<ReserveDeletePriceResponseDto | null> {
        
        const {id} = deletePriceCommand
        if(this.reserveRepository.deletePrice(id)){
            return new ReserveDeletePriceResponseDto(id)
        }

        return null
    }
}