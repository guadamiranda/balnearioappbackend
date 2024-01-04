import { DiscountRepository } from "../repository/discount-repository";
import { DiscountEntity } from "../domain/discount-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DiscountServices {
    constructor(
        private readonly discountRepository: DiscountRepository
    ) {}

    async getAllPrices(): Promise<DiscountEntity[]> {
        return await this.discountRepository.findAll()
    }

    async updateDiscount(id: string, percentage: string, name: string): Promise<DiscountEntity> {
        const existDiscount = await this.discountRepository.findOne(id)
        if(!existDiscount)
            throw Error(`El descuento con el id ${id} no existe`)

        return await this.discountRepository.updateOne(id, percentage, name)
    }

    async deleteDiscount(id: string): Promise<any> {
        const existDiscount = await this.discountRepository.findOne(id)
        if(!existDiscount)
            throw Error(`El descuento con el id ${id} no existe`)

        if(!await this.discountRepository.deleteOne(id)) {
            throw Error(`No se pudo eliminar el descuento con el id ${id}`)
        }

        return {
            message: `Se elimino el descuento con el id ${id}`
        }
    }

    async createDiscount(percentage: string, name: string): Promise<DiscountEntity> {
        const createdDiscount = await this.discountRepository.createOne(percentage, name)
        if(!createdDiscount) {
            throw Error(`No se pudo crear el descuento`)
        }

        return createdDiscount
    }
}