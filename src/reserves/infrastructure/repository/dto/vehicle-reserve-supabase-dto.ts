export class VehiclesReserveSupabase {
    carPlate: string;
    vehicleType: string;
    reserveId: string;

    constructor(carPlate: string, vehicleType: string, reserveId: string) {
        this.carPlate = carPlate;
        this.vehicleType = vehicleType;
        this.reserveId = reserveId;
    }
}