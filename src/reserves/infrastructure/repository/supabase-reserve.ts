import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { DISCOUNTS_NAME, PRICES_NAME, RESERVES_NAME, RESERVE_RESIDENTS_NAME, RESERVE_VEHICLES_NAME, RESERVE_VEHICLES_TYPE } from './constants/tableNames';
import { IRepositoryReserve } from "./repository-reserve-interface";
import { ResidentEntity } from "../../domain/resident-entity";
import { DiscountEntity } from "../../domain/discount-entity";
import { ReserveEntity } from "../../domain/reserve-entity";
import { VehicleEntity } from '../../domain/vehicle-entity';
import { PriceEntity } from "../../domain/price-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SupaBaseRepositoryReserve implements IRepositoryReserve {
    constructor (
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    private async createReserveResidents (residentsEntity: ResidentEntity[], reserveId: string): Promise<ResidentEntity[]> {
        if(!residentsEntity.length) return residentsEntity;
        const repository = this.supabaseRepository.getConnection()
        const mappedResidents = residentsEntity.map(resident => 
            { 
                return {
                    dni: resident.dni,
                    member_number: resident.memberNumber,
                    reserve_id: reserveId,
                }
            }
        )

        try {
            const { data: residentsQuery, error } = await repository
                .from(RESERVE_RESIDENTS_NAME)
                .insert(mappedResidents)
                .select()
            
            if(error) console.log(error)
            
            residentsEntity.forEach((resident,index) => resident.setId(residentsQuery[index].id))
            return residentsEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    private async createReserveVehicles (vehicleEntiy: VehicleEntity[], reserveId: string): Promise<VehicleEntity[]> {
        if(!vehicleEntiy.length) return vehicleEntiy;
        console.log(vehicleEntiy)
        const repository = this.supabaseRepository.getConnection()
        const mappedVehicles = vehicleEntiy.map(vehicle => 
            { 
                return {
                    car_plate: vehicle.carPlate,
                    vehicle_type_id: vehicle.typeVehicle,
                    reserve_id: reserveId,
                }
            }
        )

        try {
            const { data: vehiclesQuery, error } = await repository
                .from(RESERVE_VEHICLES_NAME)
                .insert(mappedVehicles)
                .select()
            
            console.log(error)
            console.log(vehiclesQuery)
            if(error) console.log(error)
            
            vehicleEntiy.forEach((vehicle,index) => vehicle.setId(vehiclesQuery[index].id))
            return vehicleEntiy
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    private async deleteReserveResidents (reserveId: string): Promise<boolean> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(RESERVE_RESIDENTS_NAME)
                .delete()
                .eq('reserve_id', reserveId)
            
            if(!error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    private async deleteVehiclesType (reserveId: string): Promise<boolean> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(RESERVE_VEHICLES_TYPE)
                .delete()
                .eq('reserve_id', reserveId)
            
            if(!error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async create(reserveEntity: ReserveEntity): Promise<ReserveEntity> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: reserveQuery, error } = await repository
                .from(RESERVES_NAME)
                .insert(
                    {
                        init_date: new Date(parseInt(reserveEntity.initDate)).toISOString(),
                        finish_date: new Date(parseInt(reserveEntity.finishDate)).toISOString(),
                        manager_dni: reserveEntity.managerDni,
                        manager_first_name: reserveEntity.managerFirstName,
                        manager_last_name: reserveEntity.managerLastName,
                        manager_car_plate: reserveEntity.managerCarPlate,
                        manager_member_number: reserveEntity.managerMemberNumber,
                        price: reserveEntity.price, 
                        workshift_id: reserveEntity.workshiftId
                    })
                .select()
            if(error) {
                console.log(error)
                return null;
            }
            reserveEntity.setId(reserveQuery[0].id)

            await this.createReserveResidents(reserveEntity.residents, reserveEntity.id)
            await this.createReserveVehicles(reserveEntity.vehicles, reserveEntity.id)

            return reserveEntity
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    async update(reserveEntity: ReserveEntity): Promise<ReserveEntity> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<boolean> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(RESERVES_NAME)
                .delete()
                .eq('id', id)
            
            if(!error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    /*async getActivesReserves(): Promise<ReserveEntity[]> {
        const repository = this.supabaseRepository.getConnection();
        const todayDate = new Date().toISOString();
        try {
            const { data: reservesQuery ,error } = await repository
                .from(RESERVES_NAME)
                .delete()
                .gt('finish_date', todayDate)
            
            if(error) console.log(error)

            /*reservesQuery.map(reserve => new ReserveEntity(
                reserve.workshift_id,
                reserve.init_date,
                reserve.finish_date,
                reserve.manager_dni,
                reserve.manager_first_name,
                reserve.manager_last_name,
                reserve.manager_card_plate,
                reserve.manager_member_number,
                
            ))
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }*/

    async getPrices(): Promise<PriceEntity[]> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: priceQuery, error } = await repository
                .from(PRICES_NAME)
                .select('*')
    
            if(error){
                console.log(error)
            }

            return priceQuery.map(price => new PriceEntity(price.id, price.name, price.amount))
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async getDiscounts(): Promise<DiscountEntity[]> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: discountQuery, error } = await repository
                .from(DISCOUNTS_NAME)
                .select('*')
    
            if(error){
                console.log(error)
            }

            return discountQuery.map(discount => new DiscountEntity(discount.id, discount.name, discount.percentage))
            
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async createDiscount(discountEntity: DiscountEntity): Promise<DiscountEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: discountQuery, error } = await repository
                .from(DISCOUNTS_NAME)
                .insert({name: discountEntity.name, percentage: discountEntity.percentage})
                .select()
            
            if(error){
                console.log(error)
            }
            
            discountEntity.setId(discountQuery[0].id)
            return discountEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async createPrice(priceEntity: PriceEntity): Promise<PriceEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: priceQuery, error } = await repository
                .from(PRICES_NAME)
                .insert({name: priceEntity.name, amount: priceEntity.amount})
                .select()
            
            if(error){
                console.log(error)
            }

            priceEntity.setId(priceQuery[0].id)
            return priceEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async updatePrice(priceEntity: PriceEntity): Promise<PriceEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(PRICES_NAME)
                .update({name: priceEntity.name ,amount: priceEntity.amount})
                .eq('id', priceEntity.id)
                .select()
            
            if(!error) console.log(error)
            
            return priceEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async deletePrice(id: string): Promise<boolean> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(PRICES_NAME)
                .delete()
                .eq('id', id)
            
            if(!error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async deleteDiscount(id: string): Promise<boolean> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(DISCOUNTS_NAME)
                .delete()
                .eq('id', id)
            
            if(!error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async updateDiscount(discountEntity: DiscountEntity): Promise<DiscountEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(DISCOUNTS_NAME)
                .update({name: discountEntity.name ,percentage: discountEntity.percentage})
                .eq('id', discountEntity.id)
                .select()
            
            if(!error) console.log(error)
            
            return discountEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }
}