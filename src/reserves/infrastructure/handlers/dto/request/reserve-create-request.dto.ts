import { Request } from 'express';

export interface ClientsReserve {
    dni: string,
    memberNumber: string,
}

export interface VehiclesReserve {
    cardPlate: string,
    vehicleType: string,
}

export interface ReserveCreateRequestDto extends Request {
    headers: {
        authorization: string;
    };
    body: {
        idEmploye: string,
        initDate: string,
        finishDate: string,
        clientsDni: ClientsReserve[],
        cardplates: VehiclesReserve[],
        price: number,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerMemberNumber: string,
    };
}
