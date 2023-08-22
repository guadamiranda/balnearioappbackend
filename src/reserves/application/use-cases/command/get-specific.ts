export class GetSpecificCommand {
    dni: string;
    carPlate: string;
    memberNumber: string;

    constructor(dni: string, carPlate: string, memberNumber: string) {
        this.dni = dni;
        this.carPlate = carPlate;
        this.memberNumber = memberNumber;
    }
  }
  