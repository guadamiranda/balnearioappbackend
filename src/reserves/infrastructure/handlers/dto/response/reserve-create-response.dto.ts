import { ResidentsReserve, VehiclesReserve } from "../request/reserve-create-request.dto";

export class ReserveCreateResponseDto {
    id: string;
    idEmploye: string;
    initDate: string;
    finishDate: string;
    residents: ResidentsReserve[];
    vehicles: VehiclesReserve[];
    price: number;
    managerDni: string;
    managerFirstName: string;
    managerLastName: string;
    managerMemberNumber: string;

    /*constructor(
        id: string,
        idEmploye: string,
        initDate: string,
        finishDate: string,
        clientsDni: ClientsReserve[],
        cardplates: VehiclesReserve[],
        price: number,
        managerDni: string,
        managerFirstName: string,
        managerLastName: string,
        managerMemberNumber: string
    ) {
        this.id = id;
        this.idEmploye = idEmploye;
        this.initDate = initDate;
        this.finishDate = finishDate;
        this.clientsDni = clientsDni;
        this.cardplates = cardplates;
        this.price = price;
        this.managerDni = managerDni;
        this.managerFirstName = managerFirstName;
        this.managerLastName = managerLastName;
        this.managerMemberNumber = managerMemberNumber;
    }*/
    constructor() {}

}
