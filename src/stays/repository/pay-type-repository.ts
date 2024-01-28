import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { PayTypeEntity } from "../domain/pay-type-entity";
import { PayTypeRow } from "./dto/pay-type-row";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PayTypeRepository {
    private repository = this.supabaseRepository.getConnection()
    private PAY_TYPE_TABLE_NAME = 'PayType'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async getAll(): Promise<PayTypeEntity[]> {
        const {data:payTypeQuery, error} = await this.repository
        .from(this.PAY_TYPE_TABLE_NAME)
        .select('*')

        if(error) {
            console.log("Error en la busqueda de los tipos de pago.\n", error)
            return null
        }

        return PayTypeRow.convertRowsToEntitys(payTypeQuery)
    }
}