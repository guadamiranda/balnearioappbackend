import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { ICreateUseCase } from "./create-use-case-interface";
import { CreateCommand } from "./commands/create-command";
import { UserEntity } from "../domain/user-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUseCase implements ICreateUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    
    async execute(createCommand: CreateCommand): Promise<UserEntity> {
        const {dni, firstName, email, password, lastName, roleId,} = createCommand;
        const userEntity = new UserEntity('', dni, firstName, lastName, email, roleId, '');
        return await this.userRepository.createEmploye(userEntity, password);
    }
}