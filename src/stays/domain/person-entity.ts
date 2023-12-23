export class PersonEntity {
    nroDoc: number
    firstName?: string
    lastName?: string
    phone?: string
    location?: string
    memberNum?: number

    constructor(nroDoc, firstName, lastName, phone, location, memberNum) {
        this.nroDoc = nroDoc,
        this.firstName = firstName,
        this.lastName = lastName,
        this.phone = phone,
        this.location = location,
        this.memberNum = memberNum
    }

    setNroDoc(nroDoc) {
        this.nroDoc = nroDoc
    }
}