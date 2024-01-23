import { IRepositoryConnection } from 'src/shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './infrastructure/connection/supabase-connections';
import { IFormatterXLSX } from './infrastructure/xlsx/interface-api-formatter-xlsx';
import { ISenderEmail } from './infrastructure/email/interface-api-email';
import { SendgridProvider } from './infrastructure/email/sendgrid';
import { ConfigModule } from '@nestjs/config';
import { XLSXJS } from './infrastructure/xlsx/xlsx-js';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {provide: IRepositoryConnection, useClass: SupabaseConnection},
    {provide: ISenderEmail, useClass: SendgridProvider},
    {provide: IFormatterXLSX, useClass: XLSXJS}
  ],
  exports: [
    {provide: IRepositoryConnection, useClass: SupabaseConnection},
    {provide: ISenderEmail, useClass: SendgridProvider},
    {provide: IFormatterXLSX, useClass: XLSXJS}
  ]
})
export class SharedModule {}
