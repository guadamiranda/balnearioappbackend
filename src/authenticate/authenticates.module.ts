import { AuthenticateController } from './controllers/authenticate-controller';
import { AuthenticateServices } from './services/authenticate-services';
import { SharedModule } from '../shared/shared.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { EmployeesModule } from '../employees/employees.module';
import { JwtStrategy } from './guards/jwt-strategy';
import { AdminGuard } from './guards/admin-guard';

//TODO: Implementar ConfigService para manejar las variables de entonro
@Module({
  imports: [
    SharedModule,
    EmployeesModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '2d' },
    }),
],
  controllers: [AuthenticateController],
  providers: [AuthenticateServices, JwtStrategy],
})
export class AuthenticateModule {}
