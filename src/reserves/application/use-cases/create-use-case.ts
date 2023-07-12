import { ReserveCreateResponseDto } from "../../infrastructure/handlers/dto/response/reserve-create-response.dto";
import { ICreateUseCase } from "./create-use-case-interface";
import { CreateCommand } from "./command/create-command";

export class CreateUseCase implements ICreateUseCase {
    async execute(createCommand: CreateCommand): Promise<ReserveCreateResponseDto> {

        // De momento lo dejo asi para que que no joda jajaj
        return new Promise<ReserveCreateResponseDto>((resolve, reject) => {
            const response = new ReserveCreateResponseDto()

            resolve(response);
          });
    }
}