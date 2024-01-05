
import { AuthenticateServices } from '../services/authenticate-services';
import { LoginRequest } from './dto/login-request';
import { JwtService } from "@nestjs/jwt";
import { 
    Controller,
    Post,
    HttpException,
    HttpStatus,
    Body,
    Get,
    Req
  } from '@nestjs/common';

@Controller('auth')
export class AuthenticateController {
  constructor(
    private readonly authService: AuthenticateServices,
    private readonly jwtService: JwtService
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

  @Get('/validate')
  async validate(@Req() req): Promise<boolean> {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is passed in the Authorization header
  
    try {
      await this.jwtService.verifyAsync(token);
      return true; // Token is valid and not expired
    } catch (error) {
      return false; // Token is either invalid or expired
    }
  }
}
