import { WorkshiftEntity } from "../../../employees/domain/workshift-entity";
import { ISenderEmail } from "./interface-api-email";
import { Injectable } from "@nestjs/common";
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
    private API_KEY = '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'
    private sender = SendGrid.setApiKey(this.API_KEY)
    async sendEmail(mail: any) {
        try {
            SendGrid.setApiKey(this.API_KEY)
            console.log(`E-Mail sent to ${mail.to}`);
            const transport = await SendGrid.send(mail);
        } catch (error) {
            console.log(error)
            console.log(error.body.errors)
            throw Error('Email not sent')
        }
        // avoid this on production. use log instead :)
    }
    sendRegisterClouser(totals: ITotalsOnDay, workshift: WorkshiftEntity) {
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
            to: workshift.employee.email,
            subject: 'Hello from sendgrid',
            from: 'small.software97@gmail.com',
            text: 'Test',
            html: templateHtml,
          })
    }
}