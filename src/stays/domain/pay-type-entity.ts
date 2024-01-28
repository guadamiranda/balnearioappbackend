export enum PayTypeCode {
    CASH_TYPE_CODE = 'EFECT',
    TRANS_TYPE_CODE = 'TRANS'
}

export class PayTypeEntity {
    id: string
    name: string
    code: PayTypeCode
    constructor(name:string, typeCode: string) {
        this.name = name
        this.code = PayTypeEntity.convertToEnumCode(typeCode)
    }

    setId(id: string) {
        this.id = id
    }

    static convertToEnumCode(codeName: string) {
        const code = codeName.toUpperCase()
        if(code == 'EFECT') return PayTypeCode.CASH_TYPE_CODE
        if(code == 'TRANS') return PayTypeCode.TRANS_TYPE_CODE
        
        throw Error(`Cannot convert pay type code: ${code} to enum.`)
    }
}