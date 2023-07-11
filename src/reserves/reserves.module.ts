
import { SupaBaseRepositoryReserve } from './infrastructure/repository/supabase-reserve-interface';
import { IRepositoryConnection } from '../shared/infrastructure/connection/repository-connection';
import { IGetDiscountsUseCase } from './application/use-cases/get-discounts-use-case-interface';
import { ReservesController } from './infrastructure/handlers/controllers/reserves-controller';
import { IRepositoryReserve } from './infrastructure/repository/repository-reserve-interface';
import { SupabaseConnection } from '../shared/infrastructure/connection/supabase-connections';
import { IGetPricesUseCase } from './application/use-cases/get-prices-use-case-interface';
import { GetDiscountsUseCase } from './application/use-cases/get-discounts-use-case';
import { GetPricesUseCase } from './application/use-cases/get-prices-use-case';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ReservesController],
    providers: [
        {provide:IRepositoryReserve, useClass:SupaBaseRepositoryReserve},
        {provide:IGetDiscountsUseCase, useClass:GetDiscountsUseCase},
        {provide: IRepositoryConnection, useClass:SupabaseConnection},
        {provide:IGetPricesUseCase, useClass:GetPricesUseCase}
    ],
    exports:[
        IRepositoryReserve,
        IGetPricesUseCase,
        IGetDiscountsUseCase
    ]
})
export class ReservesModule {}
