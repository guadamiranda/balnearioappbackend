import { FinishWorkshiftCommand } from './commands/finish-workshift-command';

export abstract class IFinishWorkshiftUseCase {
    abstract execute(finishWorkshiftCommand: FinishWorkshiftCommand): Promise<boolean>
}