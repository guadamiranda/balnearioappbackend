import { IsString } from "class-validator";

export class CreateRequestDto {
    @IsString()
    dni: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsString()
    email: string;
    
    @IsString()
    roleId: string;
}