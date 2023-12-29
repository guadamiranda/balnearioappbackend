import { PersonEntity } from "./person-entity"

export class VisitorEntity {
    id: string
    idGroup: string
    wristbandNumber: string
    idDiscount: string
    isManager: boolean
    nroDoc: string
    person?: PersonEntity

    constructor(wristbandNumber, isManager, nrodoc) {
        this.wristbandNumber = wristbandNumber,
        this.isManager = isManager,
        this.nroDoc = nrodoc
    }

    setIdDiscount(idDiscount) {
        this.idDiscount = idDiscount
    }

    setIdGroup(idGroup) {
        this.idGroup = idGroup
    }

    setId(id: string) {
        this.id = id
    }

    addPersonInfo(person: PersonEntity) {
        this.person = person
    }
}