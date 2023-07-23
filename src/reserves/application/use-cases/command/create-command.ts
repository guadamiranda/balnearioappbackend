import { ResidentsReserve, VehiclesReserve } from "../../../infrastructure/handlers/dto/request/reserve-create-request.dto"

export class CreateCommand {
    idEmploye: string;
    initDate: string;
    finishDate: string;
    residents: ResidentsReserve[];
    vehicles: VehiclesReserve[];
    price: number;
    managerDni: string;
    managerFirstName: string;
    managerLastName: string;
    managerCardPlate: string;
    managerMemberNumber: string;
    workshiftId: string;
  
    constructor(
        idEmploye: string,
        initDate: string,
        finishDate: string,
        residents: ResidentsReserve[],
        vehicles: VehiclesReserve[],
        price: number,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerCardPlate: string,
        managerMemberNumber: string,
        workshiftId: string,
    ) {
        this.idEmploye = idEmploye;
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.residents = residents;
        this.vehicles = vehicles;
        this.price = price;
        this.managerDni = managerDni;
        this.managerFirstName = managerFirstName;
        this.managerLastName = managerLastName;
        this.managerCardPlate = managerCardPlate;
        this.managerMemberNumber = managerMemberNumber;
        this.workshiftId = workshiftId;
    }
  }
  