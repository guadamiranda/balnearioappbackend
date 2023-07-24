import { ResidentsReserve, VehiclesReserve } from "../../../infrastructure/handlers/dto/request/reserve-create-request.dto"

export class CreateCommand {
    initDate: string;
    finishDate: string;
    residents: ResidentsReserve[];
    vehicles: VehiclesReserve[];
    price: number;
    managerDni: string;
    managerFirstName: string;
    managerLastName: string;
    managerCarPlate: string;
    managerMemberNumber: string;
    workshiftId: string;
  
    constructor(
        initDate: string,
        finishDate: string,
        residents: ResidentsReserve[],
        vehicles: VehiclesReserve[],
        price: number,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerCarPlate: string,
        managerMemberNumber: string,
        workshiftId: string,
    ) {
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.residents = residents;
        this.vehicles = vehicles;
        this.price = price;
        this.managerDni = managerDni;
        this.managerFirstName = managerFirstName;
        this.managerLastName = managerLastName;
        this.managerCarPlate = managerCarPlate;
        this.managerMemberNumber = managerMemberNumber;
        this.workshiftId = workshiftId;
    }
  }
  