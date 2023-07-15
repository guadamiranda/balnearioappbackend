import { DeleteRoleResponseDto } from '../infrastructure/handlers/dto/response/delete-role-response.dto';
import { DeleteRoleCommand } from './commands/delete-role-command';

export abstract class IDeleteRoleUseCase {
    abstract execute(deleteRoleCommand: DeleteRoleCommand): Promise<DeleteRoleResponseDto>
}