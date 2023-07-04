import { ResidentEntity } from "./resident-entity";
import { VehicleEntity } from "./vehicle-entity";

export class ReserveEntity {
    //AVERIGUAR COMO SE SETEA EL ID DINAMICAMENTE
    private id: '';
    private idWorkshift: string;
    private initDate: string;
    private finishDate: string;
    private residents: ResidentEntity[];
    private vehicles: VehicleEntity[];
    private price: number;
    private managerDni: string;
    private managerFirstName: string;
    private managerLastName: string;
    private managerMemberNumber: string;

    constructor(
        idWorkshift: string,
        initDate: string,
        finishDate: string,
        residents: ResidentEntity[],
        vehicles: VehicleEntity[],
        price: number,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerMemberNumber: string
    ) {
        this.idWorkshift = idWorkshift;
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.residents = residents;
        this.vehicles = vehicles;
        this.price = price;
        this.managerDni = managerDni;
        this.managerFirstName = managerFirstName;
        this.managerLastName = managerLastName;
        this.managerMemberNumber = managerMemberNumber;
    }
}