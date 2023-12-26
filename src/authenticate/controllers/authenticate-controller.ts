
import { AuthenticateServices } from '../services/authenticate-services';
import { LoginRequest } from './dto/login-request';
import { 
    Controller,
    Post,
    HttpException,
    HttpStatus,
    Body
  } from '@nestjs/common';

@Controller('auth')
export class AuthenticateController {
  constructor(
    private readonly authService: AuthenticateServices
  ) {}

  @Post('/login')
  async login(@Body() user: LoginRequest): Promise<any> {
    try {
      const response = await this.authService.login(user)
      return response
    } catch (error) {
      //TODO: Implementar manejo de excepciones
      const httpStatus = error.message = ('Invalid credentials') ? HttpStatus.UNAUTHORIZED :  HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException(error.message, httpStatus)
    }
  }
}
