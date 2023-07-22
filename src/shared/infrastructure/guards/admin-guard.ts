import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roleId = request.headers['x-role-id'];

    if (!roleId) {
      throw new HttpException('The header x-role-id has not been provided', HttpStatus.BAD_REQUEST);
    }

    //Este es el id del administrador Admin
    if (roleId !== 'eb2c431f-ce15-4770-af81-09c2a1c41fa2') {
      throw new HttpException('Should be admin user', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}