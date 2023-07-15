import { ICreateDiscountUseCase } from './application/use-cases/create-discount-use-case-interface';
import { SupaBaseRepositoryReserve } from './infrastructure/repository/supabase-reserve-interface';
import { IRepositoryConnection } from '../shared/infrastructure/connection/repository-connection';
import { IGetDiscountsUseCase } from './application/use-cases/get-discounts-use-case-interface';
import { ReservesController } from './infrastructure/handlers/controllers/reserves-controller';
import { ICreatePriceUseCase } from './application/use-cases/create-price-use-case-interface';
import { IRepositoryReserve } from './infrastructure/repository/repository-reserve-interface';
import { SupabaseConnection } from '../shared/infrastructure/connection/supabase-connections';
import { IUpdatePriceUseCase } from './application/use-cases/update-price-use-case-interface';
import { IDeletePriceUseCase } from './application/use-cases/delete-price-use-case-interface';
import { IGetPricesUseCase } from './application/use-cases/get-prices-use-case-interface';
import { CreateDiscountUseCase } from './application/use-cases/create-discount-use-case';
import { GetDiscountsUseCase } from './application/use-cases/get-discounts-use-case';
import { CreatePriceUseCase } from './application/use-cases/create-price-use-case';
import { UpdatePriceUseCase } from './application/use-cases/update-price-use-case';
import { DeletePriceUseCase } from './application/use-cases/delete-price-use-case';
import { GetPricesUseCase } from './application/use-cases/get-prices-use-case';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ReservesController],
    providers: [
        {provide: IRepositoryReserve, useClass: SupaBaseRepositoryReserve},
        {provide: ICreateDiscountUseCase, useClass: CreateDiscountUseCase},
        {provide: IRepositoryConnection, useClass: SupabaseConnection},
        {provide: IGetDiscountsUseCase, useClass: GetDiscountsUseCase},
        {provide: ICreatePriceUseCase, useClass: CreatePriceUseCase},
        {provide: IUpdatePriceUseCase, useClass: UpdatePriceUseCase},
        {provide: IDeletePriceUseCase, useClass: DeletePriceUseCase},
        {provide: IGetPricesUseCase, useClass: GetPricesUseCase},
    ],
    exports:[
        ICreateDiscountUseCase,
        IGetDiscountsUseCase,
        ICreatePriceUseCase,
        IUpdatePriceUseCase,
        IUpdatePriceUseCase,
        IRepositoryReserve,
        IGetPricesUseCase,
    ]
})
export class ReservesModule {}
