import { Request } from 'express';

export interface UserCreateRequestDto extends Request {
    headers: {
        authorization: string;
    };
    body: {
        dni: string,
        email: string,
        firstName: string,
        lastName: string,
        rolId: string,
    };
}
