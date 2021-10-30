import * as nodemailer from 'nodemailer';

export class Authorization {

    public user: string
    public pass: string

}

export class ServerLogin {

    public host: string
    public port: number
    public secure: boolean
    public auth: Authorization

}

export class Params {

    public login: ServerLogin

}

interface ITransParams {

    from: string,
    to: string,
    subject: string,
    html: string

}

export interface IEmailer {

    MailFrom: string
    MailTo: string
    Subject: string
    TextHtml: string
    send(): Promise<any>

}

export class Emailer implements IEmailer {

    private transporter: any | null = null
    private mailFrom: string
    private mailTo: string
    private subject: string
    private textHtml: string

    constructor(private params: Params) {

        this.transporter = nodemailer.createTransport(params.login);

    }

    public set MailFrom(v: string) {
        this.mailFrom = v;
    }

    public set MailTo(v: string) {
        this.mailTo = v;
    }

    public set Subject(v: string) {
        this.subject = v;
    }

    public set TextHtml(v: string) {
        this.textHtml = v;
    }

    async send(): Promise<any> {

        let params: ITransParams = {
            from: this.mailFrom,
            to: this.mailTo,
            subject: this.subject,
            html: this.textHtml
        }

        let info = await this.transporter.sendMail(params);
        return info;

    }


}

