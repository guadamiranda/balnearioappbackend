export class VisitorEntity {
    id: string
    idGroup: string
    wristbandNumber: string
    idDiscount: string
    isManager: boolean
    nroDoc: string

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
}