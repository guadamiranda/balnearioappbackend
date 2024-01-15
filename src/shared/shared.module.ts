import { IRepositoryConnection } from 'src/shared/infrastructure/connection/repository-connection';
import { SupabaseConnection } from './infrastructure/connection/supabase-connections';
import { ISenderEmail } from './infrastructure/email/interface-api-email';
import { SendgridProvider } from './infrastructure/email/sendgrid';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {provide: IRepositoryConnection, useClass: SupabaseConnection},
    {provide: ISenderEmail, useClass: SendgridProvider}
  ],
  exports: [
    {provide: IRepositoryConnection, useClass: SupabaseConnection},
    {provide: ISenderEmail, useClass: SendgridProvider}
  ]
})
export class SharedModule {}
