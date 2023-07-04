import { ReserveCreateResponseDto } from "../../infrastructure/handlers/dto/response/reserve-create-response.dto";
import { CreateCommand } from "./command/create-command";

export abstract class ICreauteUseCase {
    abstract execute(createCommand: CreateCommand) : Promise<ReserveCreateResponseDto>
}