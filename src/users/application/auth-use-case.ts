import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { WorkshiftEntity } from "../domain/workshift-entity";
import { IAuthUseCase } from "./auth-use-case-interface";
import { AuthCommand } from './commands/auth-command';
import { AuthEntity } from "../domain/auth-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthUseCase implements IAuthUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    async execute(authCommand: AuthCommand): Promise<AuthEntity | null> {
        const employe = await this.userRepository.authUser(authCommand.email, authCommand.password)
        if(!employe) return null

        const roles = await this.userRepository.getRoles();

        const employeRole = roles.find(role => role.id == employe.roleId)

        const todayUnix = new Date().getTime()
        const workshiftEntity = new WorkshiftEntity().init(todayUnix, employe.id)
        await this.userRepository.initWorkshift(workshiftEntity)

        return new AuthEntity (
            employe.roleId, 
            employeRole.name, 
            employe.firstName, 
            employe.lastName, 
            workshiftEntity.id
        )
    }
}