import { WorkshiftService } from '../services/workshift-services';
import { WorkshiftEntity } from '../domain/workshift-entity';
import { 
  Controller,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
  Body,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('workshift')
@UseGuards(AuthGuard('jwt'))
export class WorkshiftController {
  constructor(
    private readonly workshiftService: WorkshiftService
  ) {}

  @Put('/finish')
  async finishWorkshift(@Body() body, @Request() req): Promise<WorkshiftEntity> {
    try {
      return this.workshiftService.finishWorkshift(req.user.workshiftId, body.observations)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
