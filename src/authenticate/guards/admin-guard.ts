import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticateServices } from '../../authenticate/services/authenticate-services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly authServices:AuthenticateServices
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roleId = request.user.roleId;

    if (this.authServices.isAdminUser(roleId)) {
      throw new HttpException('Should be admin user', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}