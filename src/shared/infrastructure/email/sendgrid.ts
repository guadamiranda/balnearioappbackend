import { IFormatterXLSX } from "../xlsx/interface-api-formatter-xlsx";
import { ISenderEmail } from "./interface-api-email";
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common";
import * as SendGrid from '@sendgrid/mail';
import { IColumnsXlsx } from "../xlsx/xlsx-js";

interface ITotalsOnDay {
    totalEarning: number,
    totalMembers: number,
    totalNoMembers: number,
    totalDiscounts: number,
    totalVisitors: number,
    totalStayOnDay: number
}

export interface IEmployeeOnDayReport {
    dni: string,
    nameEmployee: string,
    initDate: string,
    finishDate: string
}

@Injectable()
export class SendgridProvider implements ISenderEmail {
    constructor(
      private readonly configService: ConfigService,
      private readonly XLSXFormatter: IFormatterXLSX
      ) {
      SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'))
    }
    async sendEmail(mail: any) {
        try {
            await SendGrid.send(mail);
            console.log(`Email enviado a ${mail.to.map(email => email.email)}`);
        } catch (error) {
            console.log(error)
            console.log(error.body.errors)
            throw Error('Email not sent')
        }
    }
    async sendRegisterClouser(totals: ITotalsOnDay, employee: IEmployeeOnDayReport, adminEmployeesEmail: string[]) {
        const columns: IColumnsXlsx[] = [
          {
              header: 'Dni',
              key: 'dni'
          },
          {
              header: 'Empleado',
              key: 'nameEmployee'
          },
          {
              header: 'Fecha Inicio',
              key: 'initDate'
          },
          {
            header: 'Fecha Fin',
            key: 'finishDate'
          },
          {
              header: 'Total Recaudado',
              key: 'totalEarning'
          },
          {
              header: 'Total Socios',
              key: 'totalMembers'
          },
          {
              header: 'Total Particulares',
              key: 'totalNoMembers'
          },
          {
              header: 'Total descuentos aplicados',
              key: 'totalDiscounts'
          },
          {
              header: 'Total de Personas',
              key: 'totalVisitors'
          },
          {
              header: 'Total Estadias Registradas',
              key: 'totalStayOnDay'
          }
        ]

        const dataToColumns = [{
            dni: employee.dni,
            nameEmployee: employee.nameEmployee,
            initDate: employee.initDate,
            finishDate: employee.finishDate,
            totalEarning: totals.totalEarning,
            totalMembers: totals.totalMembers,
            totalNoMembers: totals.totalNoMembers,
            totalDiscounts: totals.totalDiscounts,
            totalVisitors: totals.totalVisitors,
            totalStayOnDay: totals.totalStayOnDay
        }]

        const today = new Date()
        const fullDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
        const hourDate = `${today.getHours() - 3}:${today.getMinutes()}}`

        //const workbook = await this.XLSXFormatter.create(columns, dataToColumns)
        const templateHtml = `
        <table style="border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; border: 1px solid black;">Empleado</th>
          <th style="padding: 10px; border: 1px solid black;">DNI</th>
          <th style="padding: 10px; border: 1px solid black;">Hora Inicio</th>
          <th style="padding: 10px; border: 1px solid black;">Hora Fin</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid black;">${employee.nameEmployee}</td>
          <td style="padding: 10px; border: 1px solid black;">${employee.dni}</td>
          <td style="padding: 10px; border: 1px solid black;">${employee.initDate}</td>
          <td style="padding: 10px; border: 1px solid black;">${employee.finishDate}</td>
        </tr>
      </table>
      
      <br>
      
      <table style="border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; border: 1px solid black;">Reservas</th>
          <th style="padding: 10px; border: 1px solid black;">Total recaudado</th>
          <th style="padding: 10px; border: 1px solid black;">Total de Personas</th>
          <th style="padding: 10px; border: 1px solid black;">Total Estadias</th>
          <th style="padding: 10px; border: 1px solid black;">Total socios</th>
          <th style="padding: 10px; border: 1px solid black;">Total Particulares</th>
          <th style="padding: 10px; border: 1px solid black;">Total Descuentos</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid black;">Reservas</td>
          <td style="padding: 10px; border: 1px solid black;">${totals.totalEarning}</td>
          <td style="padding: 10px; border: 1px solid black;">${totals.totalVisitors}</td>
          <td style="padding: 10px; border: 1px solid black;">${totals.totalStayOnDay}</td>
          <td style="padding: 10px; border: 1px solid black;">${totals.totalMembers}</td>
          <td style="padding: 10px; border: 1px solid black;">${totals.totalNoMembers}</td>
          <td style="padding: 10px; border: 1px solid black;">${totals.totalDiscounts}</td>
        </tr>
      </table>
        `
        
        this.sendEmail({
            to: adminEmployeesEmail.map(email => { return {email: email} }),
            subject: `Cierre de Caja Camping Nogales ${fullDate} ${hourDate}`,
            from: 'small.software97@gmail.com',
            html: templateHtml
            /*attachments: [
              {
                content: workbook,
                filename: `Cierre de Caja Camping Nogales ${fullDate} ${hourDate}.xlsx`,
                disposition: 'attachment'
              }
            ]*/
          })
    }
}