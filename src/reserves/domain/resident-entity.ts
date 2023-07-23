export class ResidentEntity {
    id: string;
    dni: string;
    memberNumber: string;

    constructor(dni: string, memberNumber: string) {
        this.dni = dni;
        this.memberNumber = memberNumber;
    }

    setId(id: string) {
        this.id = id;
    }
}