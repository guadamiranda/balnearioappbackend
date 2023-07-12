import { IsNotEmpty, IsNumber } from 'class-validator';
import { Request } from 'express';

export interface ReserveCreateDiscountRequestDto extends Request {
    headers: {
        authorization: string;
    };
}

export class ReserveCreatePriceBodyDto {
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    amount: number;
}
