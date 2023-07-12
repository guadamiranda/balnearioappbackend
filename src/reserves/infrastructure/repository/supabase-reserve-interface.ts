import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { IRepositoryReserve } from "./repository-reserve-interface";
import { PriceEntity } from "src/reserves/domain/price-entity";
import { Injectable } from "@nestjs/common";
import { DiscountEntity } from "src/reserves/domain/discount-entity";

@Injectable()
export class SupaBaseRepositoryReserve implements IRepositoryReserve {
    constructor (
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async getPrices(): Promise<PriceEntity[]> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: priceQuery, error } = await repository
                .from('Prices')
                .select('*')
    
            if(error){
                console.log(error)
            }

            return priceQuery.map(price => new PriceEntity(price.id, price.name, price.price))
            
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async getDiscounts(): Promise<DiscountEntity[]> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: discountQuery, error } = await repository
                .from('Discounts')
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
                .from('Discounts')
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
                .from('Prices')
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
}