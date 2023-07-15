export class ReserveDeleteDiscountResponseDto {
    message: string;
    constructor(idDiscount: string) {
        this.message = `The discount ${idDiscount} was successfully removed`
    }
}