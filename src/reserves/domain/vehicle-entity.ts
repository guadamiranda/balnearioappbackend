export class VehicleEntity {
    id: string;
    cardPlate: string;
    typeVehicle: string;

    constructor(cardPlate: string, typeVehicle: string) {
        this.cardPlate = cardPlate;
        this.typeVehicle = typeVehicle;
    }

    setId(id: string) {
        this.id = id;
    }
}