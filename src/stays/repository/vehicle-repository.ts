import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { GroupEntity } from "../domain/group-entity";
import { Injectable } from "@nestjs/common";
import { GroupRow } from "./dto/group-row";
import { VehicleEntity } from "../domain/vehicle-entity";

@Injectable()
export class VehicleRepository {
    private repository = this.supabaseRepository.getConnection()
    private VEHICLE_TABLE_NAME = 'Vehicle'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async findVehicle(carPlate: string): Promise<VehicleEntity> {

        const {data:vehicleQuery, error} = await this.repository
        .from(this.VEHICLE_TABLE_NAME)
        .select()
        .eq('car_plate', carPlate)

        if(error) {
            console.log("Error en la busqueda del vehiculo.\n", error)
            return null
        }
        return new VehicleEntity(vehicleQuery[0]?.car_plate) 
    }

    async createVehicle(vehicleEntity: VehicleEntity): Promise<VehicleEntity> {

        const {data:vehicleQuery, error} = await this.repository
        .from(this.VEHICLE_TABLE_NAME)
        .insert({car_plate: vehicleEntity.carPlate})
        .select()

        if(error) {
            console.log("Error en la creacion del vehiculo.\n", error)
            return null
        }

        return vehicleEntity
    }
}