import { ResidentEntity } from "./resident-entity";
import { VehicleEntity } from "./vehicle-entity";

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

    setResidents(residents: ResidentEntity[], vehicles: VehicleEntity[]) {
        this.residents = residents;
        this.vehicles = vehicles;
    }


    setId(id: string) {
        this.id = id;
    }
}