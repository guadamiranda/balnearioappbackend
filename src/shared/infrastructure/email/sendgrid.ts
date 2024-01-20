import { WorkshiftEntity } from "../../../employees/domain/workshift-entity";
import { ISenderEmail } from "./interface-api-email";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"
import * as SendGrid from '@sendgrid/mail';

interface ITotalsOnDay {
    totalEarning: number,
    totalMembers: number,
    totalNoMembers: number,
    totalDiscounts: number,
    totalVisitors: number,
    totalStayOnDay: number
}

@Injectable()
export class SendgridProvider implements ISenderEmail {
    constructor(private readonly configService: ConfigService) {
      SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'))
    }
    async sendEmail(mail: any) {
        try {
            console.log(`E-Mail sent to ${mail.to}`);
            await SendGrid.send(mail);
        } catch (error) {
            console.log(error)
            console.log(error.body.errors)
            throw Error('Email not sent')
        }
    }
    sendRegisterClouser(totals: ITotalsOnDay, workshift: WorkshiftEntity, adminEmployeesEmail: string[]) {
        const today = new Date()
        const fullDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
        const hourDate = `${today.getHours()}:${today.getMinutes()}}`
        const templateHtml = `
        <table style="border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; border: 1px solid black;">Empleado</th>
          <th style="padding: 10px; border: 1px solid black;">DNI</th>
          <th style="padding: 10px; border: 1px solid black;">Hora Inicio</th>
          <th style="padding: 10px; border: 1px solid black;">Hora Fin</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid black;">${workshift.employee.firstName} ${workshift.employee.lastName}</td>
          <td style="padding: 10px; border: 1px solid black;">${workshift.employee.dni}</td>
          <td style="padding: 10px; border: 1px solid black;">${workshift.initDate}</td>
          <td style="padding: 10px; border: 1px solid black;">${workshift.finishDate}</td>
        </tr>
      </table>
      
      <br>
      
      <table style="border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; border: 1px solid black;">Reservas</th>
          <th style="padding: 10px; border: 1px solid black;">Total recaudado</th>
          <th style="padding: 10px; border: 1px solid black;">Total de personas ingresadas</th>
          <th style="padding: 10px; border: 1px solid black;">Cantidad de reservas hechas en el turno</th>
          <th style="padding: 10px; border: 1px solid black;">Cantidad de socios</th>
          <th style="padding: 10px; border: 1px solid black;">Cantidad de particulares</th>
          <th style="padding: 10px; border: 1px solid black;">Cantidad de descuentos aplicados</th>
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
            to: adminEmployeesEmail,
            subject: `Cierre de Caja Camping Nogales ${fullDate} ${hourDate}`,
            from: 'small.software97@gmail.com',
            html: templateHtml,
          })
    }
}