export class FinishWorkshiftCommand {
    workshiftId: string;
    observations: string;

    constructor(workshiftId: string, observations: string) {
        this.workshiftId = workshiftId;
        this.observations = observations;
    }
}