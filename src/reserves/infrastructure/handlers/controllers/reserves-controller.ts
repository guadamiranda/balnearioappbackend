import { ReserveCreateResponseDto } from '../dto/response/reserve-create-response.dto';
import { ReserveCreateRequestDto } from '../dto/request/reserve-create-request.dto';
import { Controller, Post, Req } from '@nestjs/common';
import { 
    RESERVE_CONTROLLER_BASE_PATH, 
    RESERVE_POST_PATH 
} from '../../constants/constants';

@Controller(RESERVE_CONTROLLER_BASE_PATH)
export class ReservesController {
  constructor(

  ) {}

  @Post(RESERVE_POST_PATH)
  //FALTA EL RESPONSE DE DEFINIR
  create(@Req() req: ReserveCreateRequestDto): ReserveCreateResponseDto {

    return 
  }
}
