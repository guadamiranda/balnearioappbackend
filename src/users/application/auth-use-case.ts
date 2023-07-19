import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
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
        
        return new AuthEntity(employe.roleId, employe.firstName, employe.lastName, 'worshiftId')
    }
}