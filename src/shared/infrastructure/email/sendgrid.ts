import { Injectable } from "@nestjs/common";
import { ISenderEmail } from "./interface-api-email";
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridProvider implements ISenderEmail {
    private API_KEY = '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'
    private sender = SendGrid.setApiKey(this.API_KEY)
    async sendEmail(mail: any) {
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
    }
    sendRegisterClouser(email,reportRegisterClouser) {
        console.log('Sendgrid: ', reportRegisterClouser);
    }
}