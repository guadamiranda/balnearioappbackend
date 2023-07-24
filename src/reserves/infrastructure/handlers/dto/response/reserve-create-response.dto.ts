import { ReserveEntity } from "../../../../domain/reserve-entity";

export class ResidentReserveResponse {
    dni: string;
    memberNumber: string;

    constructor(dni: string, memberNumber: string) {
        this.dni = dni;
        this.memberNumber = memberNumber;
    }
}

export class VehicleReserveResponse {
    carPlate: string;
    vehicleType: string;

    constructor(carPlate: string, vehicleType: string) {
        this.carPlate = carPlate;
        this.vehicleType = vehicleType;
    }
}


export class ReserveCreateResponseDto {
    id: string;
    initDate: string;
    finishDate: string;
    residents: ResidentReserveResponse[];
    vehicles: VehicleReserveResponse[];
    price: number;
    managerDni: string;
    managerFirstName: string;
    managerLastName: string;
    managerMemberNumber: string;
    workshiftId: string;

    constructor() {}

    static mapReserveEntity(reserveEntity: ReserveEntity) {
        const reserveResponse = new ReserveCreateResponseDto()
        reserveResponse.id = reserveEntity.id;
        reserveResponse.initDate = reserveEntity.initDate;
        reserveResponse.finishDate = reserveEntity.finishDate;
        reserveResponse.residents = reserveEntity.residents.map(resident =>  new ResidentReserveResponse(resident.dni, resident.memberNumber));
        reserveResponse.vehicles = reserveEntity.vehicles.map(vehicle =>  new VehicleReserveResponse(vehicle.carPlate, vehicle.typeVehicle));
        reserveResponse.price = reserveEntity.price;
        reserveResponse.managerDni = reserveEntity.managerDni;
        reserveResponse.managerFirstName = reserveEntity.managerFirstName;
        reserveResponse.managerLastName = reserveEntity.managerLastName;
        reserveResponse.managerMemberNumber = reserveEntity.managerMemberNumber; 
        reserveResponse.workshiftId = reserveEntity.workshiftId;

        return reserveResponse;
    }

}
