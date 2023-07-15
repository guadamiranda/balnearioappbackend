import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { IRepositoryUsers } from "./repository_user_interface"; 
import { RoleEntity } from "src/users/domain/role-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SupaBaseRepositoryUser implements IRepositoryUsers {
    constructor(private readonly repositoryUsers: IRepositoryConnection) {}

    async getRoles(): Promise<RoleEntity[]> { 
        const repo = this.repositoryUsers.getConnection()
        try {
            const { data, error } = await repo
            .from('Roles')
            .select('*')
    
            if(error){
                console.log(error)
            }
            return  new Promise<RoleEntity[]>((resolve, reject) => { 
                resolve([new RoleEntity('Michigan')]);
            });
            
        } catch (error) {
            console.log('Error: ',error)
        }
    }
}