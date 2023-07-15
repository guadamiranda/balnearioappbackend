import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { DiscountEntity } from "src/reserves/domain/discount-entity";
import { DISCOUNTS_NAME, PRICES_NAME } from "./constants/tableNames";
import { IRepositoryReserve } from "./repository-reserve-interface";
import { PriceEntity } from "src/reserves/domain/price-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SupaBaseRepositoryReserve implements IRepositoryReserve {
    constructor (
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

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