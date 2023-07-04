import { Request } from 'express';

export interface ResidentsReserve {
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
        residents: ResidentsReserve[],
        vehicles: VehiclesReserve[],
        price: number,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerMemberNumber: string,
    };
}
