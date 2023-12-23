import { VehicleRepository } from "../repository/vehicle-repository";
import { VehicleEntity } from "../domain/vehicle-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VehicleServices{
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ) {}

    async recolectDataFromVehicle(vehicleEntity: VehicleEntity): Promise<VehicleEntity> {
        console.log('Vehicle to be recolected: ', vehicleEntity)
        const vehicleRegistered = await this.findVehicle(vehicleEntity.carPlate)
        if(vehicleRegistered) return vehicleEntity
        
        await this.createVehicle(vehicleEntity)
        return vehicleEntity
    }

    async findVehicle(carPlate: string): Promise<VehicleEntity> {
        console.log('Vehicle to be found: ', carPlate)
        const vehicleEntity = await this.vehicleRepository.findVehicle(carPlate)

        if(!vehicleEntity) throw Error('Error finding Vehicle')
        
        return vehicleEntity
    }
    
    async createVehicle(vehicleEntity: VehicleEntity): Promise<VehicleEntity> {
        console.log('Vehicle to be created: ', vehicleEntity)
        const foundVehicle = await this.findVehicle(vehicleEntity.carPlate)
        if(foundVehicle && foundVehicle.carPlate != undefined) return foundVehicle

        const createdVehicle = await this.vehicleRepository.createVehicle(vehicleEntity)
        if(!createdVehicle) throw Error('Error creating vehicle')
        return createdVehicle
    }
}