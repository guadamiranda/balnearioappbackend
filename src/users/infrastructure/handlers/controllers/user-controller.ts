import { Controller, Post, Req } from '@nestjs/common';
import { USER_CONTROLLER_BASE_PATH, USER_POST_PATH } from '../../constants/constants'
import { UserCreateResponseDto } from '../dto/response/user-create-response.dto';
import { UserCreateRequestDto } from '../dto/request/user-create-request.dto';

@Controller(USER_CONTROLLER_BASE_PATH)
export class UserController {
  constructor(

  ) {}

  @Post(USER_POST_PATH)
  userAuthenticate(@Req() req: UserCreateRequestDto): Promise<UserCreateResponseDto> {

    return new Promise<UserCreateResponseDto>((resolve, reject) => {
      const response = new UserCreateResponseDto('40415923','alibaba@hotmail.com', 'Joni', 'test', '43');
      // Aquí puedes realizar cualquier lógica adicional necesaria antes de resolver la promesa
      resolve(response);
    });
  }
}
