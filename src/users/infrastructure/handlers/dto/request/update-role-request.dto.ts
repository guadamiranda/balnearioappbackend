import { IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'express';

export interface ReserveCreateDiscountRequestDto extends Request {
    headers: {
        authorization: string;
    };
}

export class UpdateRoleBodyDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
