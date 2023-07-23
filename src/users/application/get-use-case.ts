import { IRepositoryUsers } from "../infrastructure/repository/repository_user_interface";
import { IGetUseCase } from "./get-use-case-interface";
import { UserEntity } from "../domain/user-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUseCase implements IGetUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    
    async execute(): Promise<UserEntity[]> {
        return await this.userRepository.getEmployes()
    }
}