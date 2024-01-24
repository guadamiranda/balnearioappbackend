import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { IFormatterXLSX } from './interface-api-formatter-xlsx';

export interface IColumnsXlsx {
    header: string,
    key: string
}

@Injectable()
export class XLSXJS implements IFormatterXLSX {
    async create(columns, data) {
        /*const workbook = new Workbook();
        const worksheet = workbook.addWorksheet();
        worksheet.columns = columns;
        worksheet.addRows(data);
        const buffer = await worksheet.workbook.xlsx.writeBuffer()
        return (buffer as Buffer).toString("base64");*/
    }
}