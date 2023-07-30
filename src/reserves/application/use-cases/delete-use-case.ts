import { ReserveDeleteResponseDto } from '../../infrastructure/handlers/dto/response/reserve-delete-response.dto';
import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { IDeleteUseCase } from "./delete-use-case-interface";
import { DeleteCommand } from './command/delete-command';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUseCase implements IDeleteUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(deleteCommand: DeleteCommand) : Promise<ReserveDeleteResponseDto | null> {
        
        const {id} = deleteCommand
        if(this.reserveRepository.delete(id)){
            return new ReserveDeleteResponseDto(id)
        }

        return null
    }
}