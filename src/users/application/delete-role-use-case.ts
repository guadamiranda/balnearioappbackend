import { DeleteRoleResponseDto } from '../infrastructure/handlers/dto/response/delete-role-response.dto';
import { IRepositoryUsers } from '../infrastructure/repository/repository_user_interface';
import { IDeleteRoleUseCase } from './delete-role-use-case-interface';
import { DeleteRoleCommand } from './commands/delete-role-command';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteRoleUseCase implements IDeleteRoleUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    async execute(deleteRoleCommand: DeleteRoleCommand) : Promise<DeleteRoleResponseDto | null> {
        const {id} = deleteRoleCommand
        if(this.userRepository.deleteRole(id)){
            return new DeleteRoleResponseDto(id)
        }
        return null
    }
}