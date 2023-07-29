import { IGetSpecificReserveUseCase } from './application/use-cases/get-specific-reserve-use-case-interface';
import { ICreateDiscountUseCase } from './application/use-cases/create-discount-use-case-interface';
import { IUpdateDiscountUseCase } from './application/use-cases/update-discount-use-case-interface';
import { IDeleteDiscountUseCase } from './application/use-cases/delete-discount-use-case-interface';
import { IRepositoryConnection } from '../shared/infrastructure/connection/repository-connection';
import { GetSpecificReserveUseCase } from './application/use-cases/get-specific-reserve-use-case';
import { IGetDiscountsUseCase } from './application/use-cases/get-discounts-use-case-interface';
import { ReservesController } from './infrastructure/handlers/controllers/reserves-controller';
import { ICreatePriceUseCase } from './application/use-cases/create-price-use-case-interface';
import { IRepositoryReserve } from './infrastructure/repository/repository-reserve-interface';
import { SupabaseConnection } from '../shared/infrastructure/connection/supabase-connections';
import { IUpdatePriceUseCase } from './application/use-cases/update-price-use-case-interface';
import { IDeletePriceUseCase } from './application/use-cases/delete-price-use-case-interface';
import { IGetActivesReservesUseCase } from './application/use-cases/get-use-case-interface';
import { IGetPricesUseCase } from './application/use-cases/get-prices-use-case-interface';
import { SupaBaseRepositoryReserve } from './infrastructure/repository/supabase-reserve';
import { CreateDiscountUseCase } from './application/use-cases/create-discount-use-case';
import { UpdateDiscountUseCase } from './application/use-cases/update-discount-use-case';
import { DeleteDiscountUseCase } from './application/use-cases/delete-discount-use-case';
import { GetDiscountsUseCase } from './application/use-cases/get-discounts-use-case';
import { CreatePriceUseCase } from './application/use-cases/create-price-use-case';
import { UpdatePriceUseCase } from './application/use-cases/update-price-use-case';
import { DeletePriceUseCase } from './application/use-cases/delete-price-use-case';
import { ICreateUseCase } from './application/use-cases/create-use-case-interface';
import { GetActivesReservesUseCase } from './application/use-cases/get-use-case';
import { GetPricesUseCase } from './application/use-cases/get-prices-use-case';
import { CreateUseCase } from './application/use-cases/create-use-case';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ReservesController],
    providers: [
        {provide: IGetSpecificReserveUseCase, useClass: GetSpecificReserveUseCase},
        {provide: IGetActivesReservesUseCase, useClass: GetActivesReservesUseCase},
        {provide: IRepositoryReserve, useClass: SupaBaseRepositoryReserve},
        {provide: ICreateDiscountUseCase, useClass: CreateDiscountUseCase},
        {provide: IUpdateDiscountUseCase, useClass: UpdateDiscountUseCase},
        {provide: IDeleteDiscountUseCase, useClass: DeleteDiscountUseCase},
        {provide: IRepositoryConnection, useClass: SupabaseConnection},
        {provide: IGetDiscountsUseCase, useClass: GetDiscountsUseCase},
        {provide: ICreatePriceUseCase, useClass: CreatePriceUseCase},
        {provide: IUpdatePriceUseCase, useClass: UpdatePriceUseCase},
        {provide: IDeletePriceUseCase, useClass: DeletePriceUseCase},
        {provide: IGetPricesUseCase, useClass: GetPricesUseCase},
        {provide: ICreateUseCase, useClass: CreateUseCase},
    ],
    exports:[
        IGetSpecificReserveUseCase,
        IGetActivesReservesUseCase,
        IUpdateDiscountUseCase,
        IDeleteDiscountUseCase,
        ICreateDiscountUseCase,
        IGetDiscountsUseCase,
        ICreatePriceUseCase,
        IUpdatePriceUseCase,
        IUpdatePriceUseCase,
        IRepositoryReserve,
        IGetPricesUseCase,
        ICreateUseCase,
    ]
})
export class ReservesModule {}
