import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { StayTypeEntity } from "../domain/stay-type-entity";
import { StayTypeRow } from "./dto/stay-type-row";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StayTypeRepository {
    private repository = this.supabaseRepository.getConnection()
    private STAY_TYPE_TABLE_NAME = 'StayType'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async getAllStayTypes(): Promise<StayTypeEntity[]> {
        //TODO: Investigar porque esta query devuelve un array vacio
        const stayQuery: StayTypeRow[] = [
            {id: 'a5fa073e-8fb7-47ff-95b9-9a5de0590a6a', name:'Camping'},
            {id: '2c9e4708-3f2b-4ae9-99ac-d68172d0bf0e', name:'Dia'}
        ]
        /*const {data:stayQuery, error} = await this.repository
        .from(this.STAY_TYPE_TABLE_NAME)
        .select('*')

        if(error) {
            console.log("Error en la busqueda de los tipos de estadia.\n", error)
            return null
        }*/

        return StayTypeRow.convertRowsToEntities(stayQuery)
    }
}