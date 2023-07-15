import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { IUpdateRoleUseCase } from "./update-role-use-case-interface";
import { UpdateRoleCommand } from "./commands/update-role-command";
import { RoleEntity } from "../domain/role-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateRoleUseCase implements IUpdateRoleUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryUsers
    ) {}
    async execute(updateRoleCommand: UpdateRoleCommand) : Promise<RoleEntity> {
        const {id, name} = updateRoleCommand
        const discountEntity = new RoleEntity(id, name)
        return await this.reserveRepository.updateRole(discountEntity)
    }
}