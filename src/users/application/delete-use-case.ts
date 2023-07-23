import { IRepositoryUsers } from '../infrastructure/repository/repository_user_interface';
import { IDeleteUseCase } from './delete-use-case-interface';
import { DeleteCommand } from './commands/delete-command';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUseCase implements IDeleteUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    async execute(deleteCommand: DeleteCommand) : Promise<boolean> {
        const { id } = deleteCommand
        return this.userRepository.deleteEmploye(id)
    }
}