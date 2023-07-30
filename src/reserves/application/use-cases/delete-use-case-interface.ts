import { ReserveDeleteResponseDto } from '../../infrastructure/handlers/dto/response/reserve-delete-response.dto';
import { DeleteCommand } from "./command/delete-command";

export abstract class IDeleteUseCase {
    abstract execute(deleteCommand: DeleteCommand) : Promise<ReserveDeleteResponseDto>
}