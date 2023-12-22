import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { StayEntity } from "../domain/stay-entity";
import { Injectable } from "@nestjs/common";
import { StayRow } from "./dto/stay-row";

@Injectable()
export class StayRepository {
    private repository = this.supabaseRepository.getConnection()
    private STAY_TABLE_NAME = 'Stay'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async createStay(stayEntity: StayEntity): Promise<StayEntity> {
        const tableStay = StayRow.convertEntityToTable(stayEntity)
        try {
            const {data: stayQuery, error} = await this.repository
            .from(this.STAY_TABLE_NAME)
            .insert(tableStay)
            .select()

            if(error) {
                console.log("Error en la creacion de la estadia.", error)
                return null
            }

            stayEntity.setId(stayQuery[0].id)
            return stayEntity
        } catch (error) {
            console.log("Error en la creacion de la estadia. El error es: \n",error)
            return null;
        }
    }

    async getActiveStays(): Promise<StayEntity[]> {
        const today = new Date().getTime()
        const {data: staysQuery, error} = await this.repository
            .from(this.STAY_TABLE_NAME)
            .select()
            .gt('finish_date', today)

        if(error) {
            console.log("Error consultando las estadias activas" ,error)
            return null
        }

        if(staysQuery.length === 0) return []
        
        return staysQuery.map(stay => StayRow.convertTableToEntity(stay as StayRow))
    }

    async findStays(ids: string[]): Promise<StayEntity[]> {
        const {data: stayQuery, error} = await this.repository
            .from(this.STAY_TABLE_NAME)
            .select()
            .in('id', ids)
        
        if(error) {
            console.log("Error buscando estadias. \n", error)
            return null
        }

        return stayQuery.map(stay => StayRow.convertTableToEntity(stay as StayRow))
    }

    async deleteStay(ids: string[]): Promise<boolean> {
        const { error } = await this.repository
            .from(this.STAY_TABLE_NAME)
            .delete()
            .in('id', ids)
        if(error) {
            console.log("Error al borrar la estadia. \n", error)
            return false
        }
        return true
    }

    async deleteByIds(ids: string[]): Promise<boolean> {
        const { error } = await this.repository
            .from(this.STAY_TABLE_NAME)
            .delete()
            .in('id', ids)
        if(error) {
            console.log("Error al borrar la estadia. \n", error)
            return false
        }
        return true
    }
    /*async createEmploye(userEntity: UserEntity, password: string): Promise<UserEntity> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: employeQuery, error } = await repository
                .from(EMPLOYES_NAME)
                .insert({
                    dni: userEntity.dni,
                    first_name: userEntity.firstName,
                    last_name: userEntity.lastName,
                    email: userEntity.email,
                    password: password,
                    role_type_id: userEntity.roleId,
                })
                .select()
            
            if(error){
                console.log(error)
            }

            userEntity.setId(employeQuery[0].id)
            return userEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async updateEmployes(userEntity: UserEntity): Promise<UserEntity> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(EMPLOYES_NAME)
                .update({
                    dni: userEntity.dni,
                    first_name: userEntity.firstName,
                    last_name: userEntity.lastName,
                    email: userEntity.email,
                    password: userEntity.password,
                    role_type_id: userEntity.roleId,
                })
                .eq('id', userEntity.id)
                .select()
            
            if(!error) console.log(error)
            
            return userEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async deleteEmploye(id: string): Promise<boolean> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(EMPLOYES_NAME)
                .delete()
                .eq('id', id)
            
            if(error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async getEmployes(): Promise<UserEntity[]> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: employesQuery, error } = await repository
            .from(EMPLOYES_NAME)
            .select('*')
    
            if(error) console.log(error)
            
            return employesQuery.map(employe => {
                const userEntity = new UserEntity(
                    employe.id,
                    employe.dni,
                    employe.first_name,
                    employe.last_name,
                    employe.email,
                    employe.role_type_id,
                    employe.user_id
                )

                userEntity.setPassword(employe.password)
                return userEntity;
            })
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async authUser(email: string, password: string): Promise<UserEntity | null> {
        const repository = this.supabaseRepository.getConnection()

        try {
            const { data: employe, error } = await repository
            .from(EMPLOYES_NAME)
            .select('*')
            .eq('email', email, 'password', password)
    
            if(error) console.log(error)
            if(employe.length) {
                return new UserEntity(
                    employe[0].id,
                    employe[0].dni,
                    employe[0].first_name,
                    employe[0].last_name,
                    employe[0].email,
                    employe[0].role_type_id,
                    employe[0].user_account_id,
                ) 
            }

            return null
        } catch (error) {
            console.log('Error: ',error)
        }
    }
    async getRoles(): Promise<RoleEntity[]> { 
        const repository = this.supabaseRepository.getConnection()
        
        try {
            const { data: roles, error } = await repository
            .from(ROLES_NAME)
            .select('*')
    
            if(error) console.log(error)
            
            return roles
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async createRole(roleEntity: RoleEntity): Promise<RoleEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: roleQuery, error } = await repository
                .from(ROLES_NAME)
                .insert({name: roleEntity.name})
                .select()
            
            if(error){
                console.log(error)
            }

            roleEntity.setId(roleQuery[0].id)
            return roleEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async deleteRole(id: string): Promise<boolean> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(ROLES_NAME)
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

    async updateRole(roleEntity: RoleEntity): Promise<RoleEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(ROLES_NAME)
                .update({name: roleEntity.name})
                .eq('id', roleEntity.id)
                .select()
            
            if(!error) console.log(error)
            
            return roleEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async initWorkshift(workshiftEntity: WorkshiftEntity): Promise<WorkshiftEntity | boolean> {
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: worksfhitQuery ,error } = await repository
                .from(WORKSHIFTS_NAME)
                .insert({init_date: new Date(workshiftEntity.initDate).toISOString(), employe_id: workshiftEntity.employeId})
                .select()
            
            if(error) {
                console.log(error) 
                return false
            }
            
            workshiftEntity.setId(worksfhitQuery[0].id)
            return workshiftEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async finishWorkshift(workshiftId: string, observation: string): Promise<boolean> {
        const todayUnix = new Date().toISOString()
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(WORKSHIFTS_NAME)
                .update({finish_date: todayUnix, observations: observation})
                .eq('id', workshiftId)
                .select()
            
            if(error) {
                console.log(error)
                return false
            } 
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }*/
}