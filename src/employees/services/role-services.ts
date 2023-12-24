import { RoleRepository } from "../repository/role-repository";
import { RoleEntity } from "../domain/role-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository
    ) {}
    async getAllRoles(): Promise<RoleEntity[]> {
        return await this.roleRepository.findAll()
    }
}