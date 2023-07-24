import { ReserveCreateResponseDto } from "../../infrastructure/handlers/dto/response/reserve-create-response.dto";
import { IRepositoryReserve } from "../../infrastructure/repository/repository-reserve-interface";
import { ICreateUseCase } from "./create-use-case-interface";
import { ReserveEntity } from '../../domain/reserve-entity';
import { CreateCommand } from "./command/create-command";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUseCase implements ICreateUseCase {
    constructor(
        private readonly reserveRepository: IRepositoryReserve
    ) {}
    async execute(createCommand: CreateCommand): Promise<ReserveEntity> {
        const reserveEntity = new ReserveEntity()
        const { 
            finishDate, 
            initDate, 
            managerCardPlate, 
            managerDni, 
            managerFirstName,
            managerLastName,
            managerMemberNumber,
            price,
            residents,
            vehicles,
            workshiftId 
        } = createCommand;

        reserveEntity.setBasicValues(
            workshiftId,
            initDate,
            finishDate,
            managerDni,
            managerFirstName,
            managerLastName,
            managerCardPlate,
            managerMemberNumber,
            price
        );

        reserveEntity.setAllResidents(residents, vehicles)
        
        return await this.reserveRepository.create(reserveEntity);
    }
}