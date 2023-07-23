import { ReserveCreateResponseDto } from "../../infrastructure/handlers/dto/response/reserve-create-response.dto";
import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { ICreateUseCase } from "./create-use-case-interface";
import { CreateCommand } from "./command/create-command";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUseCase implements ICreateUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(createCommand: CreateCommand): Promise<ReserveCreateResponseDto> {

        return new Promise<ReserveCreateResponseDto>((resolve, reject) => {
            const response = new ReserveCreateResponseDto()

            resolve(response);
          });
    }
}