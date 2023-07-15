import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { ICreateRoleUseCase } from "./create-role-use-case-interface";
import { CreateRoleCommand } from "./commands/create-role-command";
import { RoleEntity } from "../domain/role-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateRoleUseCase implements ICreateRoleUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    
    async execute(createRoleCommand: CreateRoleCommand): Promise<RoleEntity> {
        return await this.userRepository.createRole(new RoleEntity('',createRoleCommand.name))
    }
}