export class ReserveDeletePriceResponseDto {
    message: string;
    constructor(idPrice: string) {
        this.message = `The price ${idPrice} was successfully removed`
    }
}