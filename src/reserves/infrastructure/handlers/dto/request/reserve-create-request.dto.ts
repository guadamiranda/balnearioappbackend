import { IsNotEmpty, IsString } from 'class-validator';

export class ResidentsReserve {
    @IsString()
    dni: string;
    @IsString()
    memberNumber: string;
}

export class VehiclesReserve {
    @IsString()
    carPlate: string;
    @IsString()
    vehicleType: string;

    constructor(carPlate: string, vehicleType: string) {
        this.carPlate = carPlate;
        this.vehicleType = vehicleType;
    }
}

export class ReserveCreateBodyDto {
    @IsString()
    initDate: string;
    @IsString()
    workshiftId: string;
    @IsString()
    finishDate: string;
    @IsString()
    managerCarPlate: string;
    @IsNotEmpty()
    residents: ResidentsReserve[];
    @IsNotEmpty()
    vehicles: VehiclesReserve[];
    @IsString()
    price: number;
    @IsString()
    managerDni: string;
    @IsString()
    managerFirstName: string;
    @IsString()
    managerLastName: string;
    @IsString()
    managerMemberNumber: string;
}
