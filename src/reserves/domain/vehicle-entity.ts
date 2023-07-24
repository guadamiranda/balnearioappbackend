export class VehicleEntity {
    id: string;
    carPlate: string;
    typeVehicle: string;

    constructor(carPlate: string, typeVehicle: string) {
        this.carPlate = carPlate;
        this.typeVehicle = typeVehicle;
    }

    setId(id: string) {
        this.id = id;
    }
}