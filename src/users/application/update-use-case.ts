import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { IUpdateUseCase } from "./update-use-case-interface";
import { UpdateCommand } from "./commands/update-command";
import { UserEntity } from "../domain/user-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUseCase implements IUpdateUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    
    async execute(updateCommand: UpdateCommand): Promise<UserEntity> {
        const {id, dni, firstName, email, password, lastName, roleId,} = updateCommand;
        const userEntity = new UserEntity(id, dni, firstName, lastName, email, roleId, '');
        userEntity.setPassword(password)
        return await this.userRepository.updateEmployes(userEntity);
    }
}