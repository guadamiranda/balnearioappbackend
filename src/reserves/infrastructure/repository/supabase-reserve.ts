import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { ResidentsReserveSupabase } from "./dto/resident-reserve-supabase-dto";
import { VehiclesReserveSupabase } from "./dto/vehicle-reserve-supabase-dto";
import { IRepositoryReserve } from "./repository-reserve-interface";
import { ResidentEntity } from "../../domain/resident-entity";
import { DiscountEntity } from "../../domain/discount-entity";
import { ReserveEntity } from "../../domain/reserve-entity";
import { VehicleEntity } from '../../domain/vehicle-entity';
import { PriceEntity } from "../../domain/price-entity";
import { Injectable } from "@nestjs/common";
import { 
    DISCOUNTS_NAME, PRICES_NAME, 
    RESERVES_NAME, 
    RESERVE_RESIDENTS_NAME, 
    RESERVE_VEHICLES_NAME, 
    RESERVE_VEHICLES_TYPE 
} from './constants/tableNames';

@Injectable()
export class SupaBaseRepositoryReserve implements IRepositoryReserve {
    constructor (
        private readonly supabaseRepository: IRepositoryConnection
    ) {}
    async getSpecificReserve(dni: string, carPlate: string): Promise<ReserveEntity> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: reserveQuery, error } = await repository
                .from(RESERVES_NAME)
                .select('*')
                .or(`manager_car_plate.eq.${carPlate},manager_dni.eq.${dni}`)
                .order('init_date', { ascending: false })
                .limit(1);
            
            if(error) {
                console.log(error)
                return null
            }

            if(!reserveQuery.length) {
                console.log('Not Found Error')
                return null
            }
            
            const reserveEntity = new ReserveEntity()
            reserveEntity.setBasicValues(
                reserveQuery[0].workshift_id,
                reserveQuery[0].init_date,
                reserveQuery[0].finish_date,
                reserveQuery[0].manager_dni,
                reserveQuery[0].manager_first_name,
                reserveQuery[0].manager_last_name,
                reserveQuery[0].manager_car_plate,
                reserveQuery[0].manager_member_number,
                reserveQuery[0].price
            )

            reserveEntity.setId(reserveQuery[0].id)
            const reserveResidents = await this.getReserveResidents([reserveEntity.id])
            const reserveVehicles = await this.getReserveVehicles([reserveEntity.id])

            if(!reserveResidents || !reserveVehicles) {
                console.log('ERROR EN OBTENCION DE RESIDENTES Y VEHICULOS')
                return null
            }
            reserveEntity.setAllResidents(reserveResidents, reserveVehicles)
            return reserveEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

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

    private async getReserveResidents (idsReserves: string[]): Promise<ResidentsReserveSupabase[]> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: reservesResidentQuery, error } = await repository
                .from(RESERVE_RESIDENTS_NAME)
                .select('*')
                .in('reserve_id', idsReserves)

            if(error) {
                console.log(error)
                return null
            }

            return reservesResidentQuery.map(resident => { 
                return new ResidentsReserveSupabase(
                    resident.dni,
                    resident.member_number,
                    resident.reserve_id
                )
            })

        } catch (error) {
            console.log('Error: ', error)
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

    private async deleteReserveVehicles (reserveId: string): Promise<boolean> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(RESERVE_VEHICLES_NAME)
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
            const isDeletedResidents = await this.deleteReserveResidents(id);
            const isDeletedVehicles = await this.deleteReserveVehicles(id);

            if(!isDeletedResidents || !isDeletedVehicles) {
                console.log('ERROR EN LA ELIMINACION DE RESIDENTES Y VEHICULOS')
                return null
            }

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

    async getReserveVehicles(idsReserves: string[]): Promise<VehiclesReserveSupabase[]> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: reservesVehicleQuery, error } = await repository
                .from(RESERVE_VEHICLES_NAME)
                .select('*')
                .in('reserve_id', idsReserves)

            if(error) {
                console.log(error)
                return null
            }

            return reservesVehicleQuery.map(vehicle => { 
                return new VehiclesReserveSupabase(
                    vehicle.car_plate,
                    vehicle.vehicle_type_id,
                    vehicle.reserve_id
                )
            })

        } catch (error) {
            console.log('Error: ', error)
        }
    }

    async getActivesReserves(): Promise<ReserveEntity[]> {
        const repository = this.supabaseRepository.getConnection();
        const todayDate = new Date().toISOString();
        try {
            const { data: reservesQuery, error } = await repository
                .from(RESERVES_NAME)
                .select('*')
                .gt('finish_date', todayDate)
            
            if(error) {
                console.log(error)
                return null
            } 

            const reserves: ReserveEntity[] = reservesQuery.map(reserve => {
                const reserveEntity = new ReserveEntity()
                reserveEntity.setBasicValues(
                    reserve.workshift_id,
                    reserve.init_date,
                    reserve.finish_date,
                    reserve.manager_dni,
                    reserve.manager_first_name,
                    reserve.manager_last_name,
                    reserve.manager_car_plate,
                    reserve.manager_member_number,
                    reserve.price,
                )
                reserveEntity.setId(reserve.id)

                return reserveEntity;
            })
            
            const reservesId = reserves.map(reserve => reserve.id);
            const reserveResidents = await this.getReserveResidents(reservesId);
            const reserveVehicles = await this.getReserveVehicles(reservesId);
            console.log(reserveResidents)
            console.log(reserveVehicles)
            if(!reserveResidents || !reserveVehicles) {
                console.log('ERROR EN OBTENCION DE RESIDENTES Y VEHICULOS')
                return null
            }

            reserves.forEach(reserve => {
               const residents = reserveResidents.filter(resident => resident.reserveId == reserve.id)
               const vehicles = reserveVehicles.filter(vehicle => vehicle.reserveId == reserve.id)
               reserve.setAllResidents(residents, vehicles);
            });

            return reserves;
        } catch (error) {
            console.log('Error: ',error)
        }
    }

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