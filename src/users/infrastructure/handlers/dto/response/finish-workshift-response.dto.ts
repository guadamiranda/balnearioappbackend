export class FinishWorkshitResponseDto {
    message: string;
    constructor(idWorkshift: string) {
        this.message = `The workshift ${idWorkshift} was successfully finished`
    }
}