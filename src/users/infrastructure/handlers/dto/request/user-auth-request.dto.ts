import { IsEmpty, IsString } from 'class-validator';

export class UserAuthBodyDto {
    @IsString()
    email: string;
    
    @IsString()
    password:string;
}
