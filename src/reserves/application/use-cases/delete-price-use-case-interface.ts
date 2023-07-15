import { ReserveDeletePriceResponseDto } from '../../infrastructure/handlers/dto/response/reserve-delete-price-response.dto';
import { DeletePriceCommand } from "./command/delete-price-command";

export abstract class IDeletePriceUseCase {
    abstract execute(deletePriceCommand: DeletePriceCommand) : Promise<ReserveDeletePriceResponseDto>
}