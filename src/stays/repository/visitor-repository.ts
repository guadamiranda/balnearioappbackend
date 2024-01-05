import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { VisitorEntity } from "../domain/visitor-entity";
import { VisitorRow } from "./dto/visitor-row";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VisitorRepository {
    private repository = this.supabaseRepository.getConnection()
    private VISITOR_TABLE_NAME = 'Visitor'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async createManyVisitors(visitorEntity: VisitorEntity[]): Promise<VisitorEntity[]> {
        const visitorRows: VisitorRow[] = visitorEntity.map(visitor => 
            VisitorRow.convertEntityToTable(visitor)
        )
        try {
            const {data: visitorQuery, error} = await this.repository
            .from(this.VISITOR_TABLE_NAME)
            .insert(visitorRows)
            .select()

            if(error) {
                console.log("Error en la creacion del visitante. \n", error)
                return null
            }

            this.setIdsOnEntitys(visitorEntity, visitorQuery as VisitorRow[])
            return visitorEntity
        }
        catch (error) {
            console.log("Error en la creacion del visitante. El error es: \n",error)
            return null;
        }
    }

    async deleteVisitorsbyidsGroup(idsGroup: string[]): Promise<Boolean> {
        const {data: visitorQuery, error} = await this.repository
        .from(this.VISITOR_TABLE_NAME)
        .delete()
        .in('id_group', idsGroup)

        if(error) {
            console.log("Error en la eliminacion de visitantes. \n", error)
            return false
        }
        return true
    }

    async findVisitorByDni(nroDoc: string): Promise<VisitorEntity> {
        const {data: visitorQuery, error} = await this.repository
        .from(this.VISITOR_TABLE_NAME)
        .select()
        .eq('nro_doc', nroDoc)

        if(error) {
            console.log("Error en la obtencion del visitante. \n", error)
            return null
        }

        if(visitorQuery.length === 0) return null
        return VisitorRow.convertTableToEntity(visitorQuery as VisitorRow[])[0]
    }

    async findVisitorsByIdGroup(id: string): Promise<VisitorEntity[]> {
        const {data: visitorQuery, error} = await this.repository
        .from(this.VISITOR_TABLE_NAME)
        .select()
        .eq('id_group', id)

        if(error) {
            console.log("Error en la obtencion de los visitantes. \n", error)
            return null
        }
        return VisitorRow.convertTableToEntity(visitorQuery as VisitorRow[])
    }
    
    private setIdsOnEntitys(visitorEntitys: VisitorEntity[], visitorRows: VisitorRow[]) {
        const indexVisitors = visitorRows.reduce((acc, visitor) => {
            acc[visitor.nro_doc] = visitor
            return acc
        }, {})

        visitorEntitys.forEach(entity => 
            entity.setId(indexVisitors[entity.nroDoc].id)
        )
    }
}