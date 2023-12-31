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
            managerCarPlate, 
            managerDni, 
            managerFirstName,
            managerLastName,
            managerMemberNumber,
            price,
            residents,
            vehicles,
            workshiftId,
            amountHorses 
        } = createCommand;

        reserveEntity.setBasicValues(
            workshiftId,
            initDate,
            finishDate,
            managerDni,
            managerFirstName,
            managerLastName,
            managerCarPlate,
            managerMemberNumber,
            price,
            amountHorses
        );

        reserveEntity.setAllResidents(residents, vehicles)
        console.log(reserveEntity)
        return await this.reserveRepository.create(reserveEntity);
    }
}