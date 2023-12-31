import { Injectable } from "@nestjs/common";
import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { PriceEntity } from "../domain/price-entity";
import { PriceRow } from "./dto/price-row";

@Injectable()
export class PriceRepository {
    private repository = this.supabaseRepository.getConnection()
    private PRICE_TABLE_NAME = 'Price'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}
    
    async findAll(): Promise<PriceEntity[]> {
        const {data: priceQuery, error} = await this.repository
            .from(this.PRICE_TABLE_NAME)
            .select()

        if(error) {
            console.log("Error consultando los precios" ,error)
            return null
        }

        if(priceQuery.length === 0) return []
        
        return PriceRow.convertTableToEntity(priceQuery as PriceRow[])
    }

    async findOne(id:String) : Promise<PriceEntity> {
        const {data: priceQuery, error} = await this.repository
            .from(this.PRICE_TABLE_NAME)
            .select()
            .eq('id', id)
        
        if(error){
            console.log("Error consultando el precio" ,error)
            return null
        }

        if(priceQuery.length === 0) return null

        return PriceRow.convertTableToEntity(priceQuery as PriceRow[])[0]
    }

    async updateOne(id: string, amount: number): Promise<PriceEntity> {
        const {data: priceQuery, error} = await this.repository
            .from(this.PRICE_TABLE_NAME)
            .update({amount: amount})
            .eq('id', id)
            .select()

        if(error){
            console.log("Error actualizando el precio" ,error)
            return null
        }

        return PriceRow.convertTableToEntity(priceQuery as PriceRow[])[0] 
    }
}