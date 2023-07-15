import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { IGetRolesUseCase } from "./get-roles-use-case-interface";
import { RoleEntity } from "../domain/role-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetRolesUseCase implements IGetRolesUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    
    async execute(): Promise<RoleEntity[]> {
        return await this.userRepository.getRoles()
    }
}