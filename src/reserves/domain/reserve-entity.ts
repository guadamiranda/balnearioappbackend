import { ResidentEntity } from './resident-entity';
import { VehicleEntity } from "./vehicle-entity";
import { ResidentsReserve } from '../infrastructure/handlers/dto/request/reserve-create-request.dto';
import { VehiclesReserve } from "../infrastructure/handlers/dto/request/reserve-create-request.dto";

export class ReserveEntity {
    id: string;
    workshiftId: string;
    initDate: string;
    finishDate: string;
    residents: ResidentEntity[];
    vehicles: VehicleEntity[];
    price: number;
    managerDni: string;
    managerFirstName: string;
    managerLastName: string;
    managerCardPlate: string;
    managerMemberNumber: string;

    constructor() {}

    setBasicValues(
        workshiftId: string,
        initDate: string,
        finishDate: string,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerCardPlate: string,
        managerMemberNumber: string,
        price: number,
    ) {
        this.workshiftId = workshiftId;
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.price = price;
        this.managerDni = managerDni;
        this.managerFirstName = managerFirstName;
        this.managerLastName = managerLastName;
        this.managerMemberNumber = managerMemberNumber;
        this.managerCardPlate = managerCardPlate;
    }

    setAllResidents(residents: ResidentsReserve[], vehicles: VehiclesReserve[]) {
        this.residents = residents.map(resident => new ResidentEntity(resident.dni, resident.memberNumber));
        this.vehicles = vehicles.map(vehicles => new VehicleEntity(vehicles.carPlate, vehicles.vehicleType));
    }

    setId(id: string) { this.id = id; }
}