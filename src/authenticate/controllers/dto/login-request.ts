import { IsNotEmpty } from "class-validator";

export class LoginRequest {
    @IsNotEmpty()
    dni: string;
    @IsNotEmpty()
    password: string;
}