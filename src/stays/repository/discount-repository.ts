import { Injectable } from "@nestjs/common";
import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { DiscountRow } from "./dto/discount-row";
import { DiscountEntity } from "../domain/discount-entity";

@Injectable()
export class DiscountRepository {
    private repository = this.supabaseRepository.getConnection()
    private DISCOUNT_TABLE_NAME = 'Discount'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}
    
    async findAll(): Promise<DiscountEntity[]> {
        const {data: discountQuery, error} = await this.repository
            .from(this.DISCOUNT_TABLE_NAME)
            .select()

        if(error) {
            console.log("Error consultando los descuentos activas" ,error)
            return null
        }

        if(discountQuery.length === 0) return []
        
        return DiscountRow.convertTableToEntity(discountQuery as DiscountRow[])
    }

    async findOne(id:String) : Promise<DiscountEntity> {
        const {data: discountQuery, error} = await this.repository
            .from(this.DISCOUNT_TABLE_NAME)
            .select()
            .eq('id', id)
        
        if(error){
            console.log("Error consultando el descuento" ,error)
            return null
        }

        if(discountQuery.length === 0) return null

        return DiscountRow.convertTableToEntity(discountQuery as DiscountRow[])[0]
    }

    async updateOne(id: string, percentage: string, name: string): Promise<DiscountEntity> {
        const {data: discountQuery, error} = await this.repository
            .from(this.DISCOUNT_TABLE_NAME)
            .update({percentage: percentage, name: name})
            .eq('id', id)
            .select()

        if(error){
            console.log("Error actualizando el descuento" ,error)
            return null
        }

        return DiscountRow.convertTableToEntity(discountQuery as DiscountRow[])[0]
    }

    async deleteOne(id: string): Promise<boolean> {
        const {data: discountQuery, error} = await this.repository
            .from(this.DISCOUNT_TABLE_NAME)
            .update({is_deleted: true})
            .eq('id', id)


        if(error) {
            console.log("Error eliminando el descuento" ,error)
            return false
        }

        return true
    }

    async createOne(percentage: string, name: string): Promise<DiscountEntity> {
        const {data: discountQuery, error} = await this.repository
            .from(this.DISCOUNT_TABLE_NAME)
            .insert({percentage: percentage, name: name})
            .select()

        if(error){
            console.log("Error creando el descuento" ,error)
            return null
        }

        return DiscountRow.convertTableToEntity(discountQuery as DiscountRow[])[0]
    }
}