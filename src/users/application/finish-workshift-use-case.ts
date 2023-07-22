import { IRepositoryUsers } from '../infrastructure/repository/repository_user_interface';
import { IFinishWorkshiftUseCase } from './finish-workshift-use-case-interface';
import { FinishWorkshiftCommand } from './commands/finish-workshift-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FinishWorkshiftUseCase implements IFinishWorkshiftUseCase {
    constructor(
        private readonly userRepository: IRepositoryUsers
    ) {}
    async execute(finishWorkshiftCommand: FinishWorkshiftCommand): Promise<boolean> {
        return await this.userRepository.finishWorkshift(
            finishWorkshiftCommand.workshiftId, 
            finishWorkshiftCommand.observations
            ) 
    }
}