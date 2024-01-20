import { WorkshiftEntity } from '../../employees/domain/workshift-entity';
import { StayServices } from './stay-services'
import { StayEntity } from '../domain/stay-entity';
import { GroupEntity } from '../domain/group-entity';
import { VisitorEntity } from '../domain/visitor-entity';
import { PersonEntity } from '../domain/person-entity';
import { Test } from '@nestjs/testing';

describe('generateRegisterClouser', () => {
    let stayServices: StayServices

    beforeEach(async() => {
        const moduleRef = await Test.createTestingModule({
            providers: [StayServices],
          }).compile();

        stayServices = moduleRef.get<StayServices>(StayServices)
    })

  it('should calculate totals correctly', async () => {
    const date1 = new Date()
    const initWorkshiftDate = new Date()
    initWorkshiftDate.setUTCHours(0)
    initWorkshiftDate.setUTCMinutes(0)
    initWorkshiftDate.setUTCSeconds(0)
    const finishWorkshiftDate = new Date()
    finishWorkshiftDate.setUTCHours(24)
    finishWorkshiftDate.setUTCMinutes(0)
    finishWorkshiftDate.setUTCSeconds(0)

    const stay1 = new StayEntity(date1, date1, 100, 'Dia')
    const group1 = new GroupEntity('1asd-diaojs-fasgfa-cas1', '1asd-diddjs-fasgfa-cas1', 'ABC 123')
    const visitor1 = new VisitorEntity('awij123', true, 40414922)
    const person1 = new PersonEntity(40414922, 'John', 'Doe', '123456789', 'Bogota', 1)
    visitor1.addPersonInfo(person1)
    const stay2 = new StayEntity(date1, date1, 300, 'Camping')
    const group2 = new GroupEntity('1asd-diaojs-fasgfa-cas3', '1asd-dissjs-fasgfa-cas4', 'DEF 456')
    const visitor2 = new VisitorEntity('abcj444', false, 3321234)
    const person2 = new PersonEntity(3321234, 'Jane', 'Doe', '123456789', 'Cali', 2)
    visitor2.addPersonInfo(person2)

    stay1.completeStay(group1, [visitor1])
    stay2.completeStay(group2, [visitor2])
    
    const workshift = new WorkshiftEntity("123456789", initWorkshiftDate.toISOString());
    workshift.finish(finishWorkshiftDate.toISOString(), "Finished workshift");
    workshift.setId("workshift-1");
    
    const employee = new PersonEntity(111222333, 'Employee', 'Doe', '123456789', 'Rio Cebalo', 1)
    jest.spyOn(stayServices, 'completeDataStay').mockResolvedValue([stay1, stay2])  
    const stayRepository = {
      findByDates: jest.fn().mockResolvedValue([stay1, stay2]),
    }
    const personServices = {
      findPersons: jest.fn().mockResolvedValue([/* mock employees */]),
    }
    const senderEmail = {
      sendRegisterClouser: jest.fn(),
    }

    expect(stayRepository.findByDates).toHaveBeenCalledWith(/* expected toDate and fromDate */)
    expect(personServices.findPersons).toHaveBeenCalledWith(/* expected employee DNI */)
    expect(senderEmail.sendRegisterClouser).toHaveBeenCalledWith(
      {
        totalEarning: 1,
        totalMembers: 2,
        totalNoMembers: 3,
        totalDiscounts: 4,
        totalVisitors: 5,
        totalStay:6,
      },
      employee,
      workshift
    )
  })
})