export class ResidentsReserveSupabase {
    dni: string;
    memberNumber: string;
    reserveId: string;

    constructor(dni: string, memberNumber: string, reserveId: string) {
        this.dni = dni;
        this.memberNumber = memberNumber;
        this.reserveId = reserveId;
    }
}

