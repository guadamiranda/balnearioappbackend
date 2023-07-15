import { ReserveDeleteDiscountResponseDto } from '../../infrastructure/handlers/dto/response/reserve-delete-discount-response.dto';
import { DeleteDiscountCommand } from "./command/delete-discount-command";

export abstract class IDeleteDiscountUseCase {
    abstract execute(deleteDiscountCommand: DeleteDiscountCommand) : Promise<ReserveDeleteDiscountResponseDto>
}