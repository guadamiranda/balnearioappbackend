export class ReserveDeleteResponseDto {
    message: string;
    constructor(idReserve: string) {
        this.message = `The reserve ${idReserve} was successfully removed`
    }
}