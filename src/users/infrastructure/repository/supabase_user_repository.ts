import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { WorkshiftEntity } from "src/users/domain/workshift-entity";
import { IRepositoryUsers } from "./repository_user_interface";
import { RoleEntity } from "../../domain/role-entity";
import { UserEntity } from "../../domain/user-entity";
import { Injectable } from "@nestjs/common";
import { 
    EMPLOYES_NAME,
    ROLES_NAME,
    USERS_NAME,
    WORKSHIFTS_NAME,
} from "./constants/tableNames";


@Injectable()
export class SupaBaseRepositoryUser implements IRepositoryUsers {
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async createEmploye(userEntity: UserEntity, password: string): Promise<UserEntity> {
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
                    rol_type_id: userEntity.roleId,
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
                    rol_type_id: userEntity.roleId,
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
            
            if(!error) {
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
            
            return employesQuery
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
                    employe[0].rol_type_id,
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
    }
}