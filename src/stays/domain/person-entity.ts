export class PersonEntity {
    nroDoc: string
    firstName: string
    lastName: string
    phone: string
    location: string
    memberNum: string

    constructor(nroDoc, firstName, lastName, phone, location, memberNum) {
        this.nroDoc = nroDoc,
        this.firstName = firstName,
        this.lastName = lastName,
        this.phone = phone,
        this.location = location,
        this.memberNum = memberNum
    }
}