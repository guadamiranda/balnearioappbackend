export class DeleteResponseDto {
    message: string;
    constructor(idEmploye: string) {
        this.message = `The employe ${idEmploye} was successfully removed`
    }
}