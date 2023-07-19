import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class EmployeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roleId = request.headers['x-role-id'];
    
    if (!roleId) {
      throw new HttpException('El header x-role-id no se ha proporcionado.', HttpStatus.BAD_REQUEST);
    }

    if (roleId != 'a40f006f-6a8f-4808-aa80-08f9555e71cd' && roleId != 'eb2c431f-ce15-4770-af81-09c2a1c41fa2') {
      throw new HttpException('Should be a employe user', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}