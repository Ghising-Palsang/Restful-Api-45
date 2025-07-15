const nodemailer = require('nodemailer');
const { SmtpConfig } = require('../config/config');

class EmailService {
    #transport;
    constructor(){
        try{
            this.#transport = nodemailer.createTransport({
                service: SmtpConfig.provider,
                host: SmtpConfig.host,
                port: SmtpConfig.port,
                auth: {
                    user: SmtpConfig.user,
                    pass: SmtpConfig.password
                }
            })
        }catch(exception){
            // console.error(exception);
            throw{
                message:"Error connection in SMTP server",
                status: "SMTP_CONNECTION_ERROR",
            }
        }
    }

    async sendEmail({to, sub ,message ,cc=null ,bcc=null,attachments=null}){
        try{
            let msgBody = {
                 from: SmtpConfig.from,
                to:to,
                subject: sub,           
                html: message,
            }

            if(cc){
                msgBody['cc'] = cc;
            }

            if(bcc){
                msgBody['bcc'] = bcc;
            }

            if(attachments){
                msgBody['attachments'] = attachments;
            }

            let response = await this.#transport.sendMail(msgBody);
            return response;

        }catch(exception){
            throw{
                message:"Email sending error",
                satus: "EMAIL_SENDING_ERROR",
            }
        }
    }


}

module.exports = EmailService;

