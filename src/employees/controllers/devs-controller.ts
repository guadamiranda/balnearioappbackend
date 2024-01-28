import { WorkshiftService } from '../services/workshift-services';
import { StayServices } from '../../stays/services/stay-services';
import { AuthGuard } from '@nestjs/passport';
import { 
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';

@Controller('dev')
@UseGuards(AuthGuard('jwt'))
export class DevsController {
  constructor(
    private readonly workshiftService: WorkshiftService,
    private readonly stayServices: StayServices
  ) {}

  @Delete('/admin/stays')
  async cleanAllStaysOfDevs(): Promise<Boolean> {
    try {
        const dniDevs = ['1', '2']
        const workshiftsAdmin = await this.workshiftService.getByDniEmployee(dniDevs)
        if(!workshiftsAdmin) {
            throw new HttpException('Devs workshifts not found', HttpStatus.NOT_FOUND)
        }
        const workshiftsIds = workshiftsAdmin.map(workshift => workshift.id)
        if(await this.stayServices.deleteStaysByWorkshiftIds(workshiftsIds)) {
            return await this.workshiftService.deleteWorkshiftsByIds(workshiftsIds)
        }
        return false
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
