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
}